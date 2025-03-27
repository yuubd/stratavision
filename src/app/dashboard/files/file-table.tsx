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
import IconButton from "@mui/material/IconButton";
import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import { Trash as TrashIcon } from "@phosphor-icons/react/dist/ssr/Trash";
import { Plus as PlusIcon } from "@phosphor-icons/react/dist/ssr/Plus";
import { ChartBar as ChartBarIcon } from "@phosphor-icons/react/dist/ssr/ChartBar";
import { CaretUp as CaretUpIcon } from "@phosphor-icons/react/dist/ssr/CaretUp";
import { CaretDown as CaretDownIcon } from "@phosphor-icons/react/dist/ssr/CaretDown";
import { MagnifyingGlass as MagnifyingGlassIcon } from "@phosphor-icons/react/dist/ssr/MagnifyingGlass";
import type { FileData } from "./service";
import { deleteFile } from "./service";

type SortDirection = 'asc' | 'desc' | null;

interface SortState {
  column: keyof FileData | null;
  direction: SortDirection;
}

const columns = [
  { id: 'title' as keyof FileData, label: 'Title', width: '40%' },
  { id: 'strataNumber' as keyof FileData, label: 'Strata #', width: '30%' },
  { id: 'createdAt' as keyof FileData, label: 'Created at', width: '30%' },
];

interface FileTableProps {
  files: FileData[];
  onDelete?: (id: string) => void;
  onStartUploading?: () => void;
  isEmpty?: boolean;
}

export function FileTable({ files, onDelete, onStartUploading, isEmpty = false }: FileTableProps) {
  const [selected, setSelected] = React.useState<string[]>([]);
  const [searchTerm, setSearchTerm] = React.useState<string>('');
  const [sortState, setSortState] = React.useState<SortState>({
    column: null,
    direction: null
  });

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

  const handleSelectOne = (id: string) => {
    if (selected.includes(id)) {
      setSelected(selected.filter(item => item !== id));
    } else {
      setSelected([...selected, id]);
    }
  };

  const handleSelectAll = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const filteredFiles = filteredSortedFiles.map(file => file.id);
      setSelected(filteredFiles);
    } else {
      setSelected([]);
    }
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

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  // First filter files based on search term
  const filteredFiles = React.useMemo(() => {
    if (!searchTerm.trim()) {
      return files;
    }

    const normalizedSearchTerm = searchTerm.toLowerCase().trim();
    
    return files.filter(file => {
      const titleMatch = file.title?.toLowerCase().includes(normalizedSearchTerm);
      const strataNumberMatch = file.strataNumber?.toLowerCase().includes(normalizedSearchTerm);
      return titleMatch || strataNumberMatch;
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

  // Update selected items when filtering changes to prevent selecting filtered out items
  React.useEffect(() => {
    if (selected.length > 0) {
      const filteredIds = filteredFiles.map(file => file.id);
      const validSelected = selected.filter(id => filteredIds.includes(id));
      if (validSelected.length !== selected.length) {
        setSelected(validSelected);
      }
    }
  }, [filteredFiles, selected]);

  return (
    <Box>
      {/* Actions toolbar */}
      {!isEmpty && (
        <Box>
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center', 
            py: 1,
            px: 2,
            backgroundColor: 'background.paper',
            borderBottom: 1,
            borderColor: 'divider',
          }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
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
              
              <Typography color="text.secondary">
                {selected.length > 0 ? `${selected.length} selected` : ''}
              </Typography>
            </Box>
            
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
                width: '300px',
                '& .MuiOutlinedInput-root': {
                  borderRadius: 4,
                }
              }}
            />
          </Box>
        </Box>
      )}

      <TableContainer
        sx={{
          overflow: 'hidden',
          backgroundColor: 'background.paper',
        }}
      >
        <Table sx={{ 
          '& .MuiTableCell-root': { 
            borderBottom: 1,
            borderColor: 'divider',
            borderRight: 'none',
            padding: '16px',
          },
          '& .MuiTableRow-root': {
            '&:hover': {
              backgroundColor: 'action.hover',
            },
          },
        }}>
          <TableHead>
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
              filteredSortedFiles.map((file) => (
                <TableRow
                  key={file.id}
                  sx={{ 
                    '&:last-child td, &:last-child th': { border: 0 },
                    bgcolor: selected.includes(file.id) ? 'action.selected' : 'inherit',
                  }}
                >
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={selected.includes(file.id)}
                      onChange={() => handleSelectOne(file.id)}
                    />
                  </TableCell>
                  <TableCell>{file.title}</TableCell>
                  <TableCell>{file.strataNumber}</TableCell>
                  <TableCell>{formatDate(file.createdAt)}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}