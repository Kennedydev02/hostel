import React, { useState, useEffect } from 'react';
import {
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  TextField,
  Box,
  IconButton,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TablePagination
} from '@mui/material';
import { Search, Delete, Edit } from '@mui/icons-material';

const Dashboard = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [editBooking, setEditBooking] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/bookings');
      console.log('API Response:', response); // Debug log
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('Bookings data:', data); // Debug log
      setBookings(data);
    } catch (error) {
      console.error('Error fetching bookings:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this booking?')) {
      try {
        await fetch(`http://localhost:5001/api/bookings/${id}`, {
          method: 'DELETE'
        });
        fetchBookings();
      } catch (error) {
        console.error('Error deleting booking:', error);
      }
    }
  };

  const handleEdit = (booking) => {
    setEditBooking(booking);
    setOpenDialog(true);
  };

  const handleUpdate = async () => {
    try {
      await fetch(`http://localhost:5001/api/bookings/${editBooking._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editBooking)
      });
      setOpenDialog(false);
      fetchBookings();
    } catch (error) {
      console.error('Error updating booking:', error);
    }
  };

  const filteredBookings = bookings.filter(booking => 
    booking.personalDetails.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    booking.personalDetails.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status) => {
    switch(status) {
      case 'pending': return 'warning';
      case 'paid': return 'success';
      case 'cancelled': return 'error';
      default: return 'default';
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!bookings.length) return <div>No bookings found</div>;

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom>
        Bookings Dashboard
      </Typography>
      
      <Box sx={{ mb: 3 }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Search by name or email"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            startAdornment: <Search color="action" sx={{ mr: 1 }} />
          }}
        />
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><strong>Name</strong></TableCell>
              <TableCell><strong>Email</strong></TableCell>
              <TableCell><strong>Check In</strong></TableCell>
              <TableCell><strong>Check Out</strong></TableCell>
              <TableCell><strong>Total Amount</strong></TableCell>
              <TableCell><strong>Status</strong></TableCell>
              <TableCell><strong>Actions</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredBookings
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((booking) => (
                <TableRow key={booking._id} hover>
                  <TableCell>{booking.personalDetails.fullName}</TableCell>
                  <TableCell>{booking.personalDetails.email}</TableCell>
                  <TableCell>{new Date(booking.dates.checkIn).toLocaleDateString()}</TableCell>
                  <TableCell>{new Date(booking.dates.checkOut).toLocaleDateString()}</TableCell>
                  <TableCell>${booking.fees.totalAmount}</TableCell>
                  <TableCell>
                    <Chip 
                      label={booking.payment.status}
                      color={getStatusColor(booking.payment.status)}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>
                    <IconButton size="small" color="primary" onClick={() => handleEdit(booking)}>
                      <Edit />
                    </IconButton>
                    <IconButton size="small" color="error" onClick={() => handleDelete(booking._id)}>
                      <Delete />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
        <TablePagination
          component="div"
          count={filteredBookings.length}
          page={page}
          onPageChange={(e, newPage) => setPage(newPage)}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={(e) => {
            setRowsPerPage(parseInt(e.target.value, 10));
            setPage(0);
          }}
        />
      </TableContainer>

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Edit Booking</DialogTitle>
        <DialogContent>
          {editBooking && (
            <Box sx={{ pt: 2 }}>
              <TextField
                fullWidth
                label="Name"
                value={editBooking.personalDetails.fullName}
                onChange={(e) => setEditBooking({
                  ...editBooking,
                  personalDetails: { ...editBooking.personalDetails, fullName: e.target.value }
                })}
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                label="Email"
                value={editBooking.personalDetails.email}
                onChange={(e) => setEditBooking({
                  ...editBooking,
                  personalDetails: { ...editBooking.personalDetails, email: e.target.value }
                })}
                sx={{ mb: 2 }}
              />
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button onClick={handleUpdate} variant="contained">Save</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Dashboard; 