import { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function BusinessOwnerCharts() {
  // Data dari tabel
  const ownersData = [
    {
      name: "Deden",
      data: [700000, 724000, 689000, 710000, 740000, 746000, 727000, 698000, 705000, 702000]
    },
    {
      name: "Auf",
      data: [300000, 347000, 298000, 341000, 300000, 297000, 299000, 300000, 325000, 302000]
    },
    {
      name: "Gilang",
      data: [300000, 340000, 312000, 300000, 297000, 318000, 302000, 346000, 300000, 296000]
    },
    {
      name: "Naruni",
      data: [900000, 923000, 896000, 905000, 912000, 890000, 932000, 915000, 940000, 921000]
    },
    {
      name: "Jamal",
      data: [600000, 614000, 600000, 620000, 600000, 590000, 587000, 640000, 632000, 600000]
    },
    {
      name: "Andreas",
      data: [900000, 890000, 924000, 913000, 942000, 890000, 878000, 901000, 918000, 923000]
    },
    {
      name: "Wisnu",
      data: [50000, 83000, 58000, 96000, 47000, 59000, 87000, 95000, 80000, 47000]
    },
    {
      name: "Aprian",
      data: [900000, 932000, 910000, 921000, 897000, 890000, 936000, 936000, 935000, 913000]
    },
    {
      name: "Irma",
      data: [1000000, 1013000, 989000, 1023000, 1038000, 990000, 987000, 1043000, 1027000, 1043000]
    },
    {
      name: "Joko",
      data: [1000000, 986000, 998000, 1002000, 1003000, 1012000, 1009000, 1010000, 1019000, 1000000]
    },
    {
      name: "Erik",
      data: [3000000, 3046000, 3007000, 3050000, 2970000, (3043000), 3000000, 2980000, 3000000, 2850000]
    },
    {
      name: "Indriani",
      data: [800000, 821000, 798000, 786000, 838000, 829000, 794000, 825000, 813000, 816000]
    },
    {
      name: "Sebastian",
      data: [1000000, 1001000, 1000000, 999000, 1000000, 998000, 1024000, 1023000, 1042000, 1021000]
    },
    {
      name: "Musigit Prasetya",
      data: [100000, 110000, 121000, 100000, 124000, 98000, 123000, 112000, 102000, 132000]
    },
    {
      name: "Asep",
      data: [1000000, 1021000, 1011000, 979000, 1023000, 1013000, 1034000, 1024000, 1014000, 1019000]
    }
  ];

  // Fungsi untuk memformat angka ke Rupiah
  const formatToRupiah = (value) => {
    return `Rp. ${value.toLocaleString('id-ID')}`;
  };

  // State untuk pemilik usaha yang dipilih
  const [selectedOwner, setSelectedOwner] = useState(ownersData[0].name);

  // Data untuk chart yang dipilih
  const selectedOwnerData = ownersData.find(owner => owner.name === selectedOwner);
  const chartData = selectedOwnerData.data.map((value, index) => ({
    period: index + 1,
    value: value
  }));

  // Mencari nilai minimum dan maksimum untuk YAxis
  const minValue = Math.min(...selectedOwnerData.data) * 0.9;
  const maxValue = Math.max(...selectedOwnerData.data) * 1.1;

  return (
    <div className="flex flex-col items-center w-full">
      <h2 className="text-xl font-bold mb-4">Grafik Penghasilan Usaha: {selectedOwner}</h2>
      
      <div className="mb-4">
        <label className="mr-2 font-medium">Pilih Pemilik Usaha:</label>
        <select 
          value={selectedOwner}
          onChange={(e) => setSelectedOwner(e.target.value)}
          className="border border-gray-300 rounded px-2 py-1"
        >
          {ownersData.map(owner => (
            <option key={owner.name} value={owner.name}>{owner.name}</option>
          ))}
        </select>
      </div>
      
      <div className="w-full h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={chartData}
            margin={{ top: 5, right: 30, left: 50, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              dataKey="period" 
              label={{ value: 'Periode', position: 'insideBottomRight', offset: -10 }} 
            />
            <YAxis 
              domain={[minValue, maxValue]}
              tickFormatter={formatToRupiah}
              label={{ value: 'Penghasilan (Rp)', angle: -90, position: 'insideLeft' }}
            />
            <Tooltip formatter={(value) => formatToRupiah(value)} />
            <Legend />
            <Line 
              type="monotone" 
              dataKey="value" 
              name={selectedOwner}
              stroke="#3b82f6" 
              strokeWidth={2}
              dot={{ r: 5 }}
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
      
      <div className="mt-8 w-full">
        <h3 className="text-lg font-semibold mb-2">Ringkasan Data: {selectedOwner}</h3>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          <div className="p-3 bg-blue-50 rounded border border-blue-200">
            <p className="text-sm text-gray-600">Nilai Terendah</p>
            <p className="font-bold">{formatToRupiah(Math.min(...selectedOwnerData.data))}</p>
          </div>
          <div className="p-3 bg-blue-50 rounded border border-blue-200">
            <p className="text-sm text-gray-600">Nilai Tertinggi</p>
            <p className="font-bold">{formatToRupiah(Math.max(...selectedOwnerData.data))}</p>
          </div>
          <div className="p-3 bg-blue-50 rounded border border-blue-200">
            <p className="text-sm text-gray-600">Rata-rata</p>
            <p className="font-bold">{formatToRupiah(Math.round(selectedOwnerData.data.reduce((a, b) => a + b, 0) / selectedOwnerData.data.length))}</p>
          </div>
          <div className="p-3 bg-blue-50 rounded border border-blue-200">
            <p className="text-sm text-gray-600">Total</p>
            <p className="font-bold">{formatToRupiah(selectedOwnerData.data.reduce((a, b) => a + b, 0))}</p>
          </div>
        </div>
      </div>
    </div>
  );
}