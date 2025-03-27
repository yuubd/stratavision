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
import { Trash as TrashIcon } from "@phosphor-icons/react/dist/ssr/Trash";
import { Plus as PlusIcon } from "@phosphor-icons/react/dist/ssr/Plus";
import { ChartBar as ChartBarIcon } from "@phosphor-icons/react/dist/ssr/ChartBar";
import { CaretUp as CaretUpIcon } from "@phosphor-icons/react/dist/ssr/CaretUp";
import { CaretDown as CaretDownIcon } from "@phosphor-icons/react/dist/ssr/CaretDown";
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
      setSelected(files.map(file => file.id));
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

  // Sort the files based on the current sort state
  const sortedFiles = React.useMemo(() => {
    if (!sortState.column || !sortState.direction) {
      return files;
    }

    return [...files].sort((a, b) => {
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
  }, [files, sortState]);

  return (
    <Box>
      {/* Actions toolbar */}
      {!isEmpty && (
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
                    indeterminate={selected.length > 0 && selected.length < files.length}
                    checked={files.length > 0 && selected.length === files.length}
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
            ) : (
              sortedFiles.map((file) => (
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