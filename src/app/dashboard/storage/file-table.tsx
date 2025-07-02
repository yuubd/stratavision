"use client";

import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import Collapse from "@mui/material/Collapse";
import { Trash as TrashIcon } from "@phosphor-icons/react/dist/ssr/Trash";
import { Plus as PlusIcon } from "@phosphor-icons/react/dist/ssr/Plus";
import { ChartBar as ChartBarIcon } from "@phosphor-icons/react/dist/ssr/ChartBar";
import { MagnifyingGlass as MagnifyingGlassIcon } from "@phosphor-icons/react/dist/ssr/MagnifyingGlass";
import { CaretUp as CaretUpIcon } from "@phosphor-icons/react/dist/ssr/CaretUp";
import { CaretDown as CaretDownIcon } from "@phosphor-icons/react/dist/ssr/CaretDown";
import type { FileData } from "./service";
import { deleteFile } from "./service";
import { ExpandedRowContent } from './expanded-row-content';
import { IconButton } from "@mui/material";
import { List as ListIcon } from "@phosphor-icons/react/dist/ssr/List";
import { MobileNav } from "@/components/layout/mobile-nav";
import { dashboardConfig } from "@/config/dashboard";
import TablePagination from '@mui/material/TablePagination';
import TableFooter from '@mui/material/TableFooter';
// import { useRouter } from "next/navigation";
// import { paths } from "@/paths";

type SortDirection = 'asc' | 'desc' | null;

interface SortState {
  column: keyof FileData | null;
  direction: SortDirection;
}

const columns = [
  { id: 'title' as keyof FileData,        label: 'Address',      width: '30%' },
  { id: 'strataNumber' as keyof FileData, label: 'Strata #',     width: '10%' },
  { id: 'developer' as keyof FileData,    label: 'Developer',    width: '12.5%' },
  { id: 'city' as keyof FileData,         label: 'City',         width: '12.5%' },
  { id: 'building' as keyof FileData,     label: 'Building',     width: '20%' },
  { id: 'createdAt' as keyof FileData,    label: 'Created at',   width: '15%' },
];

interface FileTableProps {
  files: FileData[];
  onDelete?: (id: string) => void;
  onStartUploading?: () => void;
  isEmpty?: boolean;
}

export function FileTable({ files, onDelete, onStartUploading, isEmpty = false }: FileTableProps) {
  // const router = useRouter();
  const [selected, setSelected] = React.useState<string[]>([]);
  const [searchTerm, setSearchTerm] = React.useState<string>('');
  const [expandedRow, setExpandedRow] = React.useState<string | null>(null);
  const [sortState, setSortState] = React.useState<SortState>({
    column: null,
    direction: null
  });
  const [openNav, setOpenNav] = React.useState(false);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(15);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true
    });
  };

  const handleDelete = async () => {
    try {
      // Delete all selected files
      for (const id of selected) {
        await deleteFile(id);
        onDelete?.(id);
      }
      // Clear selection after delete
      setSelected([]);
    } catch (error) {
      console.error('Failed to delete file:', error);
    }
  };

  const handleSelectOne = (id: string, event: React.MouseEvent) => {
    // Stop propagation to prevent row click from being triggered when checkbox is clicked
    event.stopPropagation();
    
    if (selected.includes(id)) {
      setSelected(selected.filter(item => item !== id));
    } else {
      setSelected([...selected, id]);
    }
  };

  const handleSelectAll = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      setSelected(filteredSortedFiles.map(file => file.id));
    } else {
      setSelected([]);
    }
  };
  
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };
  
  const handleSort = (column: keyof FileData) => {
    setSortState(prevState => {
      if (prevState.column === column) {
        // Toggle direction between asc and desc only
        return { column, direction: prevState.direction === 'asc' ? 'desc' : 'asc' };
      } else {
        // New column, start with ascending
        return { column, direction: 'asc' };
      }
    });
  };
  
  // Filter files based on search term
  const filteredFiles = React.useMemo(() => {
    if (!searchTerm.trim()) {
      return files;
    }

    const normalizedSearchTerm = searchTerm.toLowerCase().trim();
    
    return files.filter(file => {
      // Create combined address for searching
      const fullAddress = `${file.unitNumber}-${file.streetNumber}`.toLowerCase();
      
      return columns.some(column => {
        const value = file[column.id];
        if (value === null || value === undefined) return false;
        return String(value).toLowerCase().includes(normalizedSearchTerm);
      }) || 
      // Search in combined address
      fullAddress.includes(normalizedSearchTerm);
    });
  }, [files, searchTerm]);
  
  // Then sort the filtered files
  const filteredSortedFiles = React.useMemo(() => {
    if (!sortState.column || !sortState.direction) {
      return filteredFiles;
    }

    return [...filteredFiles].sort((a, b) => {
      const column = sortState.column as keyof FileData;
      
      // Handle date sorting specially
      if (column === 'createdAt') {
        const dateA = new Date(a[column]).getTime();
        const dateB = new Date(b[column]).getTime();
        return sortState.direction === 'asc' ? dateA - dateB : dateB - dateA;
      }

      // Regular string sorting
      const valueA = a[column];
      const valueB = b[column];
      
      if (typeof valueA === 'string' && typeof valueB === 'string') {
        return sortState.direction === 'asc' 
          ? valueA.localeCompare(valueB)
          : valueB.localeCompare(valueA);
      }
      
      return 0;
    });
  }, [filteredFiles, sortState]);

  const handleRowClick = (file: FileData) => {
    // Toggle expanded row
    setExpandedRow(prevExpandedRow => 
      prevExpandedRow === file.id ? null : file.id
    );
  };
  
  // Close expanded row when search changes
  React.useEffect(() => {
    setExpandedRow(null);
  }, [searchTerm]);

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Slice the filtered and sorted files into the current page
  const paginatedFiles = React.useMemo(() => {
    const start = page * rowsPerPage;
    return filteredSortedFiles.slice(start, start + rowsPerPage);
  }, [filteredSortedFiles, page, rowsPerPage]);

  return (
    <Box>
      {/* Actions toolbar - Always show header */}
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        p: 2, 
        backgroundColor: 'background.paper',
        borderBottom: '1px solid',
        borderColor: 'divider',
        flexWrap: { xs: 'wrap', md: 'nowrap' },
        gap: { xs: 1, sm: 2 }
      }}>
        {/* Left side - Mobile menu icon */}
        <Box sx={{ 
          width: '40px',
          display: { xs: 'block', lg: 'none' },
          position: 'relative',
          zIndex: 1200
        }}>
          <IconButton
            onClick={() => setOpenNav(true)}
            sx={{
              ml: -1,
              color: 'text.primary'
            }}
          >
            <ListIcon />
          </IconButton>
        </Box>
        
        {/* Header for all devices */}
        <Box sx={{ 
          ml: { xs: 1, sm: 2, lg: 0 }
        }}>
          <Typography 
            variant="h5"
            sx={{
              fontWeight: 600,
              color: 'text.primary',
              letterSpacing: '-0.01em'
            }}
          >
            Storage
          </Typography>
        </Box>

        {/* Spacer to push content to sides */}
        <Box sx={{ flexGrow: 1 }} />

                  {/* Right side - Selected count, delete button, and search */}
          <Box sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: { xs: 1, sm: 2, md: 3 },
            ml: { xs: 0, sm: 'auto' },
            mt: { xs: 2, md: 0 },
            flexBasis: { xs: '100%', md: 'auto' },
            justifyContent: { xs: 'space-between', md: 'flex-start' }
          }}>
            {selected.length > 0 && (
              <Typography color="text.secondary">
                {selected.length} selected
              </Typography>
            )}
            <Button
              variant="text"
              disabled={selected.length === 0}
              startIcon={<TrashIcon />}
              color="error"
              onClick={handleDelete}
              sx={{ 
                opacity: selected.length === 0 ? 0.5 : 1,
              }}
            >
              Delete
            </Button>
            <TextField
              placeholder="Search files..."
              variant="outlined"
              size="small"
              value={searchTerm}
              onChange={handleSearchChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <MagnifyingGlassIcon size={20} />
                  </InputAdornment>
                ),
                sx: { borderRadius: 4 }
              }}
              sx={{ 
                width: { xs: '50%', sm: '220px', md: '300px' },
                '& .MuiOutlinedInput-root': {
                  borderRadius: 4,
                }
              }}
            />
        </Box>
      </Box>

      <TableContainer
        sx={{
          m: "14px",
          width: 'calc(100% - 28px)',
          overflowX: 'auto',  // allow horizontal scroll when columns overflow
          backgroundColor: 'background.paper',
          borderRadius: 2,
          border: '1px solid',
          borderBottom: 'none',
          borderColor: 'divider',
          boxShadow: '0px 5px 10px 0px rgba(0, 0, 0, 0.1)',
        }}
      >
        <Table sx={{ 
          '& .MuiTableCell-root': { 
            borderBottom: '1px solid',
            borderColor: 'divider',
            borderRight: 'none',
            padding: '16px',
            borderBottomWidth: '0.5px',
          },
          '& .MuiTableBody .MuiTableRow-root': {
            '&:hover': {
              backgroundColor: 'action.hover',
            },
          },
        }}>
          <TableHead sx={{
            '& .MuiTableCell-root': {
              borderRight: '1px solid rgba(255, 255, 255, 0.2)',
              '&:last-child, &:first-of-type, &[padding="checkbox"]': {
                borderRight: 'none'
              }
            }
          }}>
            <TableRow>
              <TableCell padding="checkbox" sx={{ width: '48px' }}>
                {!isEmpty && (
                  <Checkbox
                    indeterminate={selected.length > 0 && selected.length < filteredSortedFiles.length}
                    checked={filteredSortedFiles.length > 0 && selected.length === filteredSortedFiles.length}
                    onChange={handleSelectAll}
                  />
                )}
              </TableCell>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  sx={{
                    width: column.width,
                    color: 'text.secondary',
                    fontWeight: 'medium',
                    cursor: 'pointer',
                    userSelect: 'none',
                  }}
                  onClick={() => !isEmpty && handleSort(column.id)}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Box component="span">{column.label}</Box>
                    <Box 
                      component="span" 
                      sx={{ 
                        ml: 1, 
                        width: 16, 
                        height: 16, 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'center' 
                      }}
                    >
                      {sortState.column === column.id && (
                        sortState.direction === 'asc' ? (
                          <CaretUpIcon size={16} weight="bold" />
                        ) : (
                          <CaretDownIcon size={16} weight="bold" />
                        )
                      )}
                    </Box>
                  </Box>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {isEmpty ? (
              <TableRow>
                <TableCell colSpan={columns.length + 1} sx={{ border: 0 }}>
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      py: 8,
                      gap: 2,
                    }}
                  >
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: 48,
                        height: 48,
                        borderRadius: '50%',
                        bgcolor: 'action.hover',
                        mb: 1,
                      }}
                    >
                      <ChartBarIcon />
                    </Box>
                    <Typography
                      variant="h6"
                      sx={{ color: 'text.primary', fontWeight: 500 }}
                    >
                      No files/summaries are saved yet
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ color: 'text.secondary', mb: 2 }}
                    >
                      Summarize your first strata document
                    </Typography>
                    <Button
                      onClick={onStartUploading}
                      startIcon={<PlusIcon />}
                      variant="contained"
                      sx={{ borderRadius: 24 }}
                    >
                      Start uploading
                    </Button>
                  </Box>
                </TableCell>
              </TableRow>
            ) : filteredSortedFiles.length === 0 ? (
              <TableRow>
                <TableCell colSpan={columns.length + 1} sx={{ border: 0 }}>
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      py: 6,
                      gap: 1,
                    }}
                  >
                    <Typography
                      variant="h6"
                      sx={{ color: 'text.primary', fontWeight: 500 }}
                    >
                      No matching files found
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ color: 'text.secondary' }}
                    >
                      Try adjusting your search term
                    </Typography>
                  </Box>
                </TableCell>
              </TableRow>
            ) : (
              React.Fragment && paginatedFiles.map((file) => (
                <React.Fragment key={file.id}>
                  <TableRow
                    onClick={() => handleRowClick(file)}
                    sx={{ 
                      '&:last-child td, &:last-child th': { border: expandedRow === file.id ? 0 : undefined },
                      bgcolor: expandedRow === file.id ? 'primary.light' : selected.includes(file.id) ? 'action.selected' : 'inherit',
                      cursor: 'pointer',
                      '&:hover': {
                        backgroundColor: expandedRow === file.id ? 'primary.light' : 'action.hover',
                      },
                    }}
                  >
                    <TableCell padding="checkbox" onClick={(e) => e.stopPropagation()}>
                      <Checkbox
                        checked={selected.includes(file.id)}
                        onChange={(e) => handleSelectOne(file.id, e as unknown as React.MouseEvent)}
                      />
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Typography variant="body2">
                          {`${file.unitNumber}-${file.streetNumber}`}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Typography 
                        variant="body2"
                        sx={{
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          minWidth: '90px' // Adjust the width as needed
                        }}
                      >
                        {file.strataNumber}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">{file.developer}</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">{file.city}</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">{file.building}</Typography>
                    </TableCell>
                    <TableCell sx={{ whiteSpace: 'nowrap' }}>
                      <Typography variant="body2">{formatDate(file.createdAt)}</Typography>
                    </TableCell>
                  </TableRow>
                  {/* Expanded row content */}
                  <TableRow sx={{ bgcolor: 'background.default' }}>
                    <TableCell 
                      style={{ padding: 0 }} 
                      colSpan={columns.length + 1}
                    >
                      <Collapse in={expandedRow === file.id} timeout="auto" unmountOnExit>
                        <ExpandedRowContent file={file} />
                      </Collapse>
                    </TableCell>
                  </TableRow>
                </React.Fragment>
              ))
            )}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={columns.length + 1} >
                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <TablePagination
                    component="div"
                    count={filteredSortedFiles.length}
                    page={page}
                    onPageChange={handleChangePage}
                    rowsPerPage={rowsPerPage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                    rowsPerPageOptions={[10, 15, 25, 50]}
                    sx={{ m: 0 }}
                  />
                </Box>
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
      
      {/* Mobile Navigation */}
      <MobileNav
        items={dashboardConfig.navItems}
        onClose={() => setOpenNav(false)}
        open={openNav}
      />
    </Box>
  );
}