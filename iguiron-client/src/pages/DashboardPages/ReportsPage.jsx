import React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import { PieChart } from '@mui/x-charts/PieChart';
import { Gauge } from '@mui/x-charts/Gauge';
import Stack from '@mui/material/Stack';
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
      <Typography variant="h4" gutterBottom>
        Reports
      </Typography>

      {/* Summary Cards */}
      <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} sx={{ mb: 4 }}>
        <Card>
          <CardContent>
            <Typography variant="h6">Total Revenue</Typography>
            <Typography variant="h4">$48,295</Typography>
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <Typography variant="h6">Growth Rate</Typography>
            <Typography variant="h4">+12.5%</Typography>
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <Typography variant="h6">Active Projects</Typography>
            <Typography variant="h4">7</Typography>
          </CardContent>
        </Card>
      </Stack>

      {/* Gauges */}
      <Typography variant="h5" gutterBottom>
        Performance Metrics
      </Typography>
      <Stack direction={{ xs: 'column', md: 'row' }} spacing={3} sx={{ mb: 4 }}>
        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="body2" gutterBottom>Completion Rate</Typography>
          <Gauge width={150} height={150} value={75} />
        </Box>
        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="body2" gutterBottom>Target Progress</Typography>
          <Gauge width={150} height={150} value={50} valueMin={10} valueMax={60} />
        </Box>
      </Stack>

      {/* Bar Chart */}
      <Typography variant="h5" gutterBottom>
        Quarterly Performance
      </Typography>
      <Box sx={{ mb: 4 }}>
        <BarChart
          series={quarterlyData}
          height={290}
          xAxis={[{ data: ['Q1', 'Q2', 'Q3', 'Q4'], scaleType: 'band', label: 'Quarters' }]}
        />
      </Box>

      {/* Pie Chart */}
      <Typography variant="h5" gutterBottom>
        Distribution
      </Typography>
      <Box sx={{ mb: 4 }}>
        <PieChart
          series={[{ data: distributionData }]}
          width={400}
          height={200}
        />
      </Box>
    </>
  );
}

export default ReportsPage;
