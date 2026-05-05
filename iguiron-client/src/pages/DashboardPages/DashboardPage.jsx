import { BarChart } from '@mui/x-charts/BarChart';
import { DataGrid } from '@mui/x-data-grid';
import Box from '@mui/material/Box';
import { Gauge } from '@mui/x-charts/Gauge';
import { Typography, Card, CardContent, Chip } from '@mui/material';
import { PieChart } from '@mui/x-charts/PieChart';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import usersData from '../../data/users.json';

const totalUsers = usersData.length;
const activeUsers = usersData.filter((u) => u.status === 'Active').length;
const adminCount = usersData.filter((u) => u.role === 'Admin').length;
const editorCount = usersData.filter((u) => u.role === 'Editor').length;
const activeRate = Math.round((activeUsers / totalUsers) * 100);
const adminRate = Math.round((adminCount / totalUsers) * 100);

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
const monthlySignups = [1, 2, 1, 2, 2, 2];

const roleDistribution = [
  { id: 0, value: adminCount, label: 'Admin' },
  { id: 1, value: editorCount, label: 'Editor' },
  { id: 2, value: usersData.filter((u) => u.role === 'User').length, label: 'User' },
];

const columns = [
  { field: 'id', headerName: '#', width: 60 },
  { field: 'firstName', headerName: 'First Name', width: 130 },
  { field: 'lastName', headerName: 'Last Name', width: 130 },
  { field: 'username', headerName: 'Username', width: 150 },
  { field: 'role', headerName: 'Role', width: 110 },
  {
    field: 'status',
    headerName: 'Status',
    width: 110,
    renderCell: (params) => (
      <Chip
        label={params.value}
        size="small"
        color={params.value === 'Active' ? 'success' : 'error'}
      />
    ),
  },
];

function DashboardPage() {
  return (
    <>
      <Typography variant="h4" gutterBottom>Dashboard</Typography>

      <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: 2 }}>

        {/* Row 1: Stat cards */}
        <Card sx={{ gridColumn: { xs: 'span 12', sm: 'span 6', md: 'span 3' } }}>
          <CardContent>
            <Typography variant="overline" color="text.secondary">Total Users</Typography>
            <Typography variant="h3" color="primary" sx={{ mt: 1 }}>{totalUsers}</Typography>
          </CardContent>
        </Card>

        <Card sx={{ gridColumn: { xs: 'span 12', sm: 'span 6', md: 'span 3' } }}>
          <CardContent>
            <Typography variant="overline" color="text.secondary">Active Users</Typography>
            <Typography variant="h3" color="primary" sx={{ mt: 1 }}>{activeUsers}</Typography>
          </CardContent>
        </Card>

        <Card sx={{ gridColumn: { xs: 'span 12', sm: 'span 6', md: 'span 3' } }}>
          <CardContent>
            <Typography variant="overline" color="text.secondary">Admins</Typography>
            <Typography variant="h3" color="primary" sx={{ mt: 1 }}>{adminCount}</Typography>
          </CardContent>
        </Card>

        <Card sx={{ gridColumn: { xs: 'span 12', sm: 'span 6', md: 'span 3' } }}>
          <CardContent>
            <Typography variant="overline" color="text.secondary">Editors</Typography>
            <Typography variant="h3" color="primary" sx={{ mt: 1 }}>{editorCount}</Typography>
          </CardContent>
        </Card>

        {/* Row 2: Bar chart + Pie chart */}
        <Card sx={{ gridColumn: { xs: 'span 12', md: 'span 8' } }}>
          <CardContent>
            <Typography variant="overline" color="text.secondary">Monthly Signups</Typography>
            <Box sx={{ width: '100%', mt: 1 }}>
              <BarChart
                series={[{ data: monthlySignups, label: 'Signups' }]}
                height={260}
                xAxis={[{ data: months, scaleType: 'band', label: 'Month' }]}
              />
            </Box>
          </CardContent>
        </Card>

        <Card sx={{ gridColumn: { xs: 'span 12', md: 'span 4' } }}>
          <CardContent>
            <Typography variant="overline" color="text.secondary">Role Distribution</Typography>
            <Box sx={{ width: '100%', mt: 1 }}>
              <PieChart
                series={[{ data: roleDistribution }]}
                height={240}
              />
            </Box>
          </CardContent>
        </Card>

        {/* Row 3: Gauges */}
        <Card sx={{ gridColumn: { xs: 'span 12', sm: 'span 6', md: 'span 3' } }}>
          <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Typography variant="overline" color="text.secondary">Active Rate %</Typography>
            <Gauge width={110} height={110} value={activeRate} sx={{ mt: 1 }} />
          </CardContent>
        </Card>

        <Card sx={{ gridColumn: { xs: 'span 12', sm: 'span 6', md: 'span 3' } }}>
          <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Typography variant="overline" color="text.secondary">Admin Rate %</Typography>
            <Gauge width={110} height={110} value={adminRate} sx={{ mt: 1 }} />
          </CardContent>
        </Card>

        {/* Row 4: DataGrid (full width) */}
        <Card sx={{ gridColumn: 'span 12' }}>
          <CardContent>
            <Typography variant="overline" color="text.secondary">Users Overview</Typography>
            <Box sx={{ height: 400, width: '100%', mt: 1 }}>
              <DataGrid
                rows={usersData}
                columns={columns}
                initialState={{ pagination: { paginationModel: { pageSize: 5 } } }}
                pageSizeOptions={[5]}
                disableRowSelectionOnClick
              />
            </Box>
          </CardContent>
        </Card>

        {/* Row 5: Map (full width) */}
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
