"use client";

import * as React from "react";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Chip from "@mui/material/Chip";
import type { FileData } from "./service";

const columns = [
  { id: 'name', label: 'Title', width: '30%' },
  { id: 'size', label: 'Size', width: '15%' },
  { id: 'uploadedAt', label: 'Uploaded', width: '25%' },
  { id: 'status', label: 'Status', width: '15%' },
  { id: 'type', label: 'Type', width: '15%' },
];

interface FileTableProps {
  files: FileData[];
}

export function FileTable({ files }: FileTableProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const formatSize = (bytes: number) => {
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    if (bytes === 0) return '0 Byte';
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return `${Math.round(bytes / Math.pow(1024, i))} ${sizes[i]}`;
  };

  const getStatusColor = (status: FileData['status']) => {
    switch (status) {
      case 'processed':
        return 'success';
      case 'processing':
        return 'warning';
      case 'failed':
        return 'error';
      default:
        return 'default';
    }
  };

  return (
    <TableContainer
      sx={{
        borderRadius: 2,
        border: '1px solid var(--mui-palette-divider)',
        overflow: 'hidden',
      }}
    >
      <Table>
        <TableHead>
          <TableRow>
            {columns.map((column, index) => (
              <TableCell
                key={column.id}
                sx={{
                  width: column.width,
                  color: 'var(--mui-palette-text-secondary)',
                  borderBottom: '1px solid var(--mui-palette-divider)',
                  borderRight: index < columns.length - 1 ? '1px solid var(--mui-palette-divider)' : 'none',
                  py: 1.5,
                  bgcolor: 'var(--mui-palette-background-level1)',
                }}
              >
                {column.label}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {files.map((file) => (
            <TableRow
              key={file.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell>{file.name}</TableCell>
              <TableCell>{formatSize(file.size)}</TableCell>
              <TableCell>{formatDate(file.uploadedAt)}</TableCell>
              <TableCell>
                <Chip 
                  label={file.status} 
                  color={getStatusColor(file.status)}
                  size="small"
                  variant="soft"
                />
              </TableCell>
              <TableCell>{file.type}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}