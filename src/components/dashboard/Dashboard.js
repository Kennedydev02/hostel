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
  TablePagination,
  CircularProgress
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

  // Update API URL to point to the backend API
  const API_URL = 'https://api.hudumacenter.org';

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/api/bookings`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('Bookings data:', data);
      setBookings(data);
      setError(null);
    } catch (error) {
      console.error('Fetch error:', error);
      setError('Failed to load bookings. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this booking?')) {
      try {
        const response = await fetch(`${API_URL}/api/bookings/${id}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        await fetchBookings();
        alert('Booking deleted successfully');
      } catch (error) {
        console.error('Delete error:', error);
        alert('Failed to delete booking');
      }
    }
  };

  const handleEdit = (booking) => {
    setEditBooking(booking);
    setOpenDialog(true);
  };

  const handleUpdate = async () => {
    try {
      const response = await fetch(`${API_URL}/api/bookings/${editBooking._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editBooking)
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      setOpenDialog(false);
      await fetchBookings();
      alert('Booking updated successfully');
    } catch (error) {
      console.error('Update error:', error);
      alert('Failed to update booking');
    }
  };

  const filteredBookings = bookings.filter(booking =>
    booking.personalDetails.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    booking.personalDetails.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <Container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <Typography color="error" align="center">
          {error}
        </Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          Bookings Dashboard
        </Typography>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Search bookings..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{ mb: 2 }}
          InputProps={{
            startAdornment: <Search sx={{ mr: 1, color: 'text.secondary' }} />,
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
                      color={booking.payment.status === 'completed' ? 'success' : 'warning'}
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