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
import type { FileData } from "./service";
import { deleteFile } from "./service";

const columns = [
  { id: 'title', label: 'Title', width: '40%' },
  { id: 'strataNumber', label: 'Strata #', width: '30%' },
  { id: 'createdAt', label: 'Created at', width: '30%' },
];

interface FileTableProps {
  files: FileData[];
  onDelete?: (id: string) => void;
  onStartUploading?: () => void;
  isEmpty?: boolean;
}

export function FileTable({ files, onDelete, onStartUploading, isEmpty = false }: FileTableProps) {
  const [selected, setSelected] = React.useState<string[]>([]);

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

  return (
    <Box>
      {/* Actions toolbar */}
      {!isEmpty && (
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          p: 2, 
          backgroundColor: 'background.paper',
          borderBottom: '1px solid',
          borderColor: 'divider'
        }}>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button
              variant="text"
              disabled={selected.length === 0}
              startIcon={<TrashIcon />}
              color="error"
              onClick={handleDelete}
            >
              Delete
            </Button>
          </Box>
          <Typography>
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
            borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
            borderRight: 'none',
            padding: '16px',
          },
          '& .MuiTableRow-root': {
            backgroundColor: '#1a1c2a',
            '&:hover': {
              backgroundColor: '#22253a',
            },
          },
        }}>
          <TableHead sx={{ backgroundColor: '#1a1c2a' }}>
            <TableRow>
              <TableCell padding="checkbox" sx={{ width: '48px' }}>
                {!isEmpty && (
                  <Checkbox
                    indeterminate={selected.length > 0 && selected.length < files.length}
                    checked={files.length > 0 && selected.length === files.length}
                    onChange={handleSelectAll}
                    sx={{ 
                      color: 'grey.500',
                      '&.Mui-checked': {
                        color: 'primary.main',
                      },
                    }}
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
                  }}
                >
                  {column.label}
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
                        bgcolor: 'background.level1',
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
              files.map((file) => (
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
                      sx={{ 
                        color: 'grey.500',
                        '&.Mui-checked': {
                          color: 'primary.main',
                        },
                      }}
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