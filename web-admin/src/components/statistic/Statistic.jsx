import { useEffect, useState } from 'react';
import {
  Paper, Typography, TextField,
  FormControl, InputLabel, Select, MenuItem, Box,
} from '@mui/material';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ResponsiveContainer,
} from 'recharts';
import { statisticApi } from '../../api/statisticApi';
import { useSnackbar } from 'notistack';

export default function Statistic() {
  const { enqueueSnackbar } = useSnackbar();

  const [year, setYear] = useState(new Date().getFullYear());
  const [type, setType] = useState('revenue');          // 'revenue' | 'most-traveled' | 'most-canceled'
  const [data, setData] = useState([]);

  /* helper toast */
  const toast = (status, msg) =>
    enqueueSnackbar(msg, { variant: status === 'SUCCESS' ? 'success' : 'error' });

  /* load data mỗi khi đổi năm / loại */
  useEffect(() => {
    const fetcher = {
      revenue:        () => statisticApi.getRevenue(year),
      'most-traveled':() => statisticApi.getMostTraveled(year),
      'most-canceled':() => statisticApi.getMostCanceled(year),
    }[type];

    fetcher()
      .then(setData)
      .catch((e) => toast('FAILED', e.message));
  }, [year, type]);

  /* tuỳ loại thống kê → key/label khác nhau */
  const chartProps = {
    revenue:        { key: 'totalRevenue',   name: 'Doanh thu' },
    'most-traveled':{ key: 'passengerCount', name: 'Hành khách' },
    'most-canceled':{ key: 'passengerCount', name: 'Huỷ vé' },
  }[type];

  return (
    <Paper elevation={3} sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom>Thống kê năm {year}</Typography>

      {/* Bộ lọc năm & loại thống kê */}
      <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
        <TextField
          label="Năm"
          type="number"
          value={year}
          onChange={(e) => setYear(+e.target.value)}
          InputProps={{ inputProps: { min: 2000, max: 2100 } }}
        />
        <FormControl>
          <InputLabel>Loại thống kê</InputLabel>
          <Select
            value={type}
            label="Loại thống kê"
            onChange={(e) => setType(e.target.value)}
          >
            <MenuItem value="revenue">Doanh thu &amp; số vé</MenuItem>
            <MenuItem value="most-traveled">Tuyến đi nhiều nhất</MenuItem>
            <MenuItem value="most-canceled">Tuyến huỷ nhiều nhất</MenuItem>
          </Select>
        </FormControl>
      </Box>

      {/* Biểu đồ cột */}
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey={chartProps.key} name={chartProps.name} fill="#1976d2" />
        </BarChart>
      </ResponsiveContainer>
    </Paper>
  );
}
