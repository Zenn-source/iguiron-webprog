import { BarChart } from '@mui/x-charts/BarChart';
import { PieChart } from '@mui/x-charts/PieChart';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import GlobalStyles from '@mui/material/GlobalStyles';
import PrintIcon from '@mui/icons-material/Print';
import usersData from '../../data/users.json';

const totalUsers = usersData.length;
const activeUsers = usersData.filter((u) => u.status === 'Active').length;
const adminCount = usersData.filter((u) => u.role === 'Admin').length;
const editorCount = usersData.filter((u) => u.role === 'Editor').length;
const userCount = usersData.filter((u) => u.role === 'User').length;

const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"];
const monthlySignups = [1, 2, 5, 2, 4, 2, 4];
const monthlyActive = [1, 1, 4, 2, 3, 2, 2];

const roleDistribution = [
  { id: 0, value: adminCount, label: 'Admin' },
  { id: 1, value: editorCount, label: 'Editor' },
  { id: 2, value: userCount, label: 'User' },
];

function ReportsPage() {
  return (
    <>
      <GlobalStyles styles={`
        @media print {
          .MuiAppBar-root,
          .MuiDrawer-root,
          .no-print {
            display: none !important;
          }
        }
      `} />

      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h4">Reports Summary</Typography>
        <Button
          className="no-print"
          variant="outlined"
          startIcon={<PrintIcon />}
          onClick={() => window.print()}
        >
          Print Report
        </Button>
      </Box>

      <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: 2 }}>

        <Card sx={{ gridColumn: { xs: 'span 12', sm: 'span 4' } }}>
          <CardContent>
            <Typography variant="overline" color="text.secondary">Total Users</Typography>
            <Typography variant="h3" color="primary" sx={{ mt: 1 }}>{totalUsers}</Typography>
          </CardContent>
        </Card>

        <Card sx={{ gridColumn: { xs: 'span 12', sm: 'span 4' } }}>
          <CardContent>
            <Typography variant="overline" color="text.secondary">Active Users</Typography>
            <Typography variant="h3" color="primary" sx={{ mt: 1 }}>{activeUsers}</Typography>
          </CardContent>
        </Card>

        <Card sx={{ gridColumn: { xs: 'span 12', sm: 'span 4' } }}>
          <CardContent>
            <Typography variant="overline" color="text.secondary">Total Admins</Typography>
            <Typography variant="h3" color="primary" sx={{ mt: 1 }}>{adminCount}</Typography>
          </CardContent>
        </Card>

        <Card sx={{ gridColumn: 'span 12' }}>
          <CardContent>
            <Typography variant="overline" color="text.secondary">Monthly Report Graph</Typography>
            <Box sx={{ width: '100%', mt: 1 }}>
              <BarChart
                series={[
                  { data: monthlySignups, label: 'Signups' },
                  { data: monthlyActive, label: 'Active Users' },
                ]}
                height={280}
                xAxis={[{ data: months, scaleType: 'band', label: 'Month' }]}
              />
            </Box>
          </CardContent>
        </Card>

        <Card sx={{ gridColumn: { xs: 'span 12', md: 'span 6' } }}>
          <CardContent>
            <Typography variant="overline" color="text.secondary">Report Category Share</Typography>
            <Box sx={{ width: '100%', mt: 1 }}>
              <PieChart
                series={[{ data: roleDistribution }]}
                height={260}
              />
            </Box>
          </CardContent>
        </Card>

        <Card sx={{ gridColumn: { xs: 'span 12', md: 'span 6' } }}>
          <CardContent>
            <Typography variant="overline" color="text.secondary">User Breakdown</Typography>
            <Box sx={{ mt: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
              {[
                { label: 'Admins', value: adminCount, color: '#8ed5ff' },
                { label: 'Editors', value: editorCount, color: '#ffb74d' },
                { label: 'Regular Users', value: userCount, color: '#81c784' },
                { label: 'Inactive', value: totalUsers - activeUsers, color: '#e57373' },
              ].map((item) => (
                <Box key={item.label}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                    <Typography variant="body2" color="text.secondary">{item.label}</Typography>
                    <Typography variant="body2" fontWeight={600}>{item.value}</Typography>
                  </Box>
                  <Box sx={{ height: 8, borderRadius: 4, bgcolor: 'action.hover', overflow: 'hidden' }}>
                    <Box
                      sx={{
                        height: '100%',
                        width: `${(item.value / totalUsers) * 100}%`,
                        bgcolor: item.color,
                        borderRadius: 4,
                      }}
                    />
                  </Box>
                </Box>
              ))}
            </Box>
          </CardContent>
        </Card>

      </Box>
    </>
  );
}

export default ReportsPage;
