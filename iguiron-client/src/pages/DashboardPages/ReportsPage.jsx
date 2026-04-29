import React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import { PieChart } from '@mui/x-charts/PieChart';
import { Gauge } from '@mui/x-charts/Gauge';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

const quarterlyData = [
  { data: [35, 44, 24, 34], label: 'Series 1' },
  { data: [51, 6, 49, 30], label: 'Series 2' },
];

const distributionData = [
  { id: 0, value: 10, label: 'Series A' },
  { id: 1, value: 15, label: 'Series B' },
  { id: 2, value: 20, label: 'Series C' },
];

function ReportsPage() {
  return (
    <>
      <Typography variant="h4" gutterBottom>Reports</Typography>

      <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: 2 }}>

        {/* Stat: Total Revenue */}
        <Card sx={{ gridColumn: { xs: 'span 12', sm: 'span 6', md: 'span 4' } }}>
          <CardContent>
            <Typography variant="overline" color="text.secondary">Total Revenue</Typography>
            <Typography variant="h3" color="primary" sx={{ mt: 1 }}>$48,295</Typography>
          </CardContent>
        </Card>

        {/* Stat: Growth Rate */}
        <Card sx={{ gridColumn: { xs: 'span 12', sm: 'span 6', md: 'span 4' } }}>
          <CardContent>
            <Typography variant="overline" color="text.secondary">Growth Rate</Typography>
            <Typography variant="h3" color="primary" sx={{ mt: 1 }}>+12.5%</Typography>
          </CardContent>
        </Card>

        {/* Stat: Active Projects */}
        <Card sx={{ gridColumn: { xs: 'span 12', sm: 'span 6', md: 'span 4' } }}>
          <CardContent>
            <Typography variant="overline" color="text.secondary">Active Projects</Typography>
            <Typography variant="h3" color="primary" sx={{ mt: 1 }}>7</Typography>
          </CardContent>
        </Card>

        {/* Gauge: Completion Rate */}
        <Card sx={{ gridColumn: { xs: 'span 12', sm: 'span 6' } }}>
          <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Typography variant="overline" color="text.secondary">Completion Rate</Typography>
            <Gauge width={150} height={150} value={75} sx={{ mt: 1 }} />
          </CardContent>
        </Card>

        {/* Gauge: Target Progress */}
        <Card sx={{ gridColumn: { xs: 'span 12', sm: 'span 6' } }}>
          <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Typography variant="overline" color="text.secondary">Target Progress</Typography>
            <Gauge width={150} height={150} value={50} valueMin={10} valueMax={60} sx={{ mt: 1 }} />
          </CardContent>
        </Card>

        {/* Bar Chart */}
        <Card sx={{ gridColumn: { xs: 'span 12', md: 'span 8' } }}>
          <CardContent>
            <Typography variant="overline" color="text.secondary">Quarterly Performance</Typography>
            <Box sx={{ width: '100%', mt: 1 }}>
              <BarChart
                series={quarterlyData}
                height={280}
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
                series={[{ data: distributionData }]}
                height={260}
              />
            </Box>
          </CardContent>
        </Card>

      </Box>
    </>
  );
}

export default ReportsPage;
