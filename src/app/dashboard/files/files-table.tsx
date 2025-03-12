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
import { Plus as PlusIcon } from "@phosphor-icons/react/dist/ssr/Plus";
import { ChartBar as ChartBarIcon } from "@phosphor-icons/react/dist/ssr/ChartBar";

const columns = [
	{ id: 'title', label: 'Title', width: '30%' },
	{ id: 'type', label: 'Type', width: '20%' },
	{ id: 'created', label: 'Created', width: '25%' },
	{ id: 'status', label: 'Status', width: '15%' },
	{ id: 'action', label: 'Action', width: '10%' },
];

interface FilesTableProps {
	onStartUploading: () => void;
}

export function FilesTable({ onStartUploading }: FilesTableProps): React.JSX.Element {
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
					{/* Empty state */}
					<TableRow>
						<TableCell colSpan={5} sx={{ border: 0 }}>
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
										bgcolor: 'var(--mui-palette-background-level1)',
										mb: 1,
									}}
								>
									<ChartBarIcon />
								</Box>
								<Typography
									variant="h6"
									sx={{ color: 'var(--mui-palette-text-primary)', fontWeight: 500 }}
								>
									No files detected
								</Typography>
								<Typography
									variant="body2"
									sx={{ color: 'var(--mui-palette-text-secondary)', mb: 2 }}
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
				</TableBody>
			</Table>
		</TableContainer>
	);
} 