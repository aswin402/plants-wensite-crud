import Plants from '@/app/plants/page'
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
  return (
    <Table>
      <TableCaption>Table with vertical lines.</TableCaption>
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
  )
}


