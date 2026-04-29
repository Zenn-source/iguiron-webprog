import React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import { DataGrid } from '@mui/x-data-grid';
import Box from '@mui/material/Box';
import { Gauge } from '@mui/x-charts/Gauge';
import { Typography, Card, CardContent } from '@mui/material';
import { PieChart } from '@mui/x-charts/PieChart';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const columns = [
  { field: 'id', headerName: 'ID', width: 90 },
  { field: 'firstName', headerName: 'First name', width: 150, editable: true },
  { field: 'lastName', headerName: 'Last name', width: 150, editable: true },
  { field: 'age', headerName: 'Age', type: 'number', width: 110, editable: true },
  {
    field: 'fullName',
    headerName: 'Full name',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 160,
    valueGetter: (value, row) => `${row.firstName || ''} ${row.lastName || ''}`,
  },
];

const rows = [
  { id: 1, lastName: 'Snow', firstName: 'Jon', age: 14 },
  { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 31 },
  { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 31 },
  { id: 4, lastName: 'Stark', firstName: 'Arya', age: 11 },
  { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
  { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
  { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
  { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
  { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
];

const avgAge = (
  rows.reduce((sum, row) => sum + (row.age || 0), 0) /
  rows.filter((row) => row.age !== null).length
).toFixed(1);

function DashboardPage() {
  return (
    <>
      <Typography variant="h4" gutterBottom>Dashboard</Typography>

      <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: 2 }}>

        {/* Stat: Total Users */}
        <Card sx={{ gridColumn: { xs: 'span 12', sm: 'span 6', md: 'span 3' } }}>
          <CardContent>
            <Typography variant="overline" color="text.secondary">Total Users</Typography>
            <Typography variant="h3" color="primary" sx={{ mt: 1 }}>{rows.length}</Typography>
          </CardContent>
        </Card>

        {/* Stat: Average Age */}
        <Card sx={{ gridColumn: { xs: 'span 12', sm: 'span 6', md: 'span 3' } }}>
          <CardContent>
            <Typography variant="overline" color="text.secondary">Average Age</Typography>
            <Typography variant="h3" color="primary" sx={{ mt: 1 }}>{avgAge}</Typography>
          </CardContent>
        </Card>

        {/* Gauge 1 */}
        <Card sx={{ gridColumn: { xs: 'span 12', sm: 'span 6', md: 'span 3' } }}>
          <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Typography variant="overline" color="text.secondary">Metric A</Typography>
            <Gauge width={110} height={110} value={50} sx={{ mt: 1 }} />
          </CardContent>
        </Card>

        {/* Gauge 2 */}
        <Card sx={{ gridColumn: { xs: 'span 12', sm: 'span 6', md: 'span 3' } }}>
          <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Typography variant="overline" color="text.secondary">Metric B</Typography>
            <Gauge width={110} height={110} value={50} valueMin={10} valueMax={60} sx={{ mt: 1 }} />
          </CardContent>
        </Card>

        {/* Bar Chart */}
        <Card sx={{ gridColumn: { xs: 'span 12', md: 'span 8' } }}>
          <CardContent>
            <Typography variant="overline" color="text.secondary">Quarterly Sales</Typography>
            <Box sx={{ width: '100%', mt: 1 }}>
              <BarChart
                series={[
                  { data: [35, 44, 24, 34], label: 'Series 1' },
                  { data: [51, 6, 49, 30], label: 'Series 2' },
                ]}
                height={260}
                xAxis={[{ data: ['Q1', 'Q2', 'Q3', 'Q4'], scaleType: 'band', label: 'Quarters' }]}
              />
            </Box>
          </CardContent>
        </Card>

        {/* Pie Chart */}
        <Card sx={{ gridColumn: { xs: 'span 12', md: 'span 4' } }}>
          <CardContent>
            <Typography variant="overline" color="text.secondary">Distribution</Typography>
            <Box sx={{ width: '100%', mt: 1 }}>
              <PieChart
                series={[{
                  data: [
                    { id: 0, value: 10, label: 'Series A' },
                    { id: 1, value: 15, label: 'Series B' },
                    { id: 2, value: 20, label: 'Series C' },
                  ],
                }]}
                height={240}
              />
            </Box>
          </CardContent>
        </Card>

        {/* DataGrid */}
        <Card sx={{ gridColumn: 'span 12' }}>
          <CardContent>
            <Typography variant="overline" color="text.secondary">Users Overview</Typography>
            <Box sx={{ height: 400, width: '100%', mt: 1 }}>
              <DataGrid
                rows={rows}
                columns={columns}
                experimentalFeatures={{ newEditingApi: true }}
                initialState={{ pagination: { paginationModel: { pageSize: 5 } } }}
                pageSizeOptions={[5]}
                checkboxSelection
                disableRowSelectionOnClick
              />
            </Box>
          </CardContent>
        </Card>

        {/* Map */}
        <Card sx={{ gridColumn: 'span 12' }}>
          <CardContent>
            <Typography variant="overline" color="text.secondary">Location Map</Typography>
            <Box sx={{ height: 400, width: '100%', mt: 1, borderRadius: 2, overflow: 'hidden' }}>
              <MapContainer center={[14.604253, 120.994314]} zoom={13} style={{ height: '100%', width: '100%' }}>
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                <Marker position={[14.604253, 120.994314]}>
                  <Popup>
                    National University Manila <br />
                    551 F Jhocson St, Sampaloc, Manila, 1008 Metro Manila
                  </Popup>
                </Marker>
              </MapContainer>
            </Box>
          </CardContent>
        </Card>

      </Box>
    </>
  );
}

export default DashboardPage;
