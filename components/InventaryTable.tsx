"use client";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import { Input } from './ui/input';
import { Search } from 'lucide-react';
import { use, useState } from 'react';
import { Combobox } from './ui/combo-box';
const plants = [
  {
    id: 1,
    name: 'Rose',
    category: 'Flower',
    price: '$10.99',
    stocks: 10,
  },
  {
    id: 2,
    name: 'Lavender',
    category: 'Herb',
    price: '$8.49',
    stocks: 5,
  }
  // Add more plant data here...
];


export default function InventaryTable(){
  const [selectedCategory,setSelectedCategory]=useState("");
  return (
    <div className="w-full">
      <div className="flex items-center gap-2 py-4">
         <div className="relative max-w-sm w-full">
          <Input
            placeholder="Filter plants..."
            className="pl-10"
          />
          <Search className="absolute h-4 w-4 left-3 top-1/2 transform -translate-y-1/2" />
        </div>

        <Combobox
          value={selectedCategory}
          onChange={(val) => setSelectedCategory(val)}
        />
      </div>






      <Table>
      <TableCaption>end of lines.</TableCaption>
      <TableHeader>
        <TableRow className='*:border-border [&>:not(:last-child)]:border-r bg-zinc-900'>
          <TableHead className='w-25'>Plant id</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>category</TableHead>
          <TableHead>Price</TableHead>
          <TableHead className='text-right'>Stocks</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {plants.map(plant => (
          <TableRow key={plant.id} className='*:border-border [&>:not(:last-child)]:border-r'>
            <TableCell className='font-medium'>{plant.id}</TableCell>
            <TableCell>{plant.name}</TableCell>
            <TableCell>{plant.category}</TableCell>   
            <TableCell>{plant.price}</TableCell>
            <TableCell className='text-right'>{plant.stocks}</TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter className='bg-zinc-900'>
        <TableRow>
          <TableCell colSpan={3}>Total</TableCell>
          <TableCell className='text-left'>$2,500.00</TableCell>
          <TableCell className='text-right'>$2,500.00</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
    </div>
  )
}


