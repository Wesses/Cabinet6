// import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
// import { Card, CardContent } from '@/components/ui/card';
// import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table';
// import { cn } from '@/lib/utils';

// const WaterSupplyFeeTab = () => {
//   return (
//     <div>
//       <Card>
//         <CardContent className="p-4">
//           <h2 className="md:text-2xl text-xl font-semibold mb-4">
//             Водопостачання
//           </h2>
//           <div className="overflow-auto w-full">
//             <Accordion type="multiple">
//               {accordionValues.map(({ label, value, key, data }) => (
//                 <AccordionItem value={key}>
//                   <AccordionTrigger className="w-full" disabled={!value}>
//                     <div className="flex justify-between w-full px-4 font-medium">
//                       <p className="hover:underline font-bold md:text-lg text-base">
//                         {label}
//                       </p>
//                       <p
//                         className={cn(
//                           {
//                             "text-red-500": !value,
//                             "text-green-500": value,
//                           },
//                           "md:text-base text-sm"
//                         )}
//                       >
//                         {value ? "Розгорнути" : "Послуга відсутня"}
//                       </p>
//                     </div>
//                   </AccordionTrigger>
//                   <AccordionContent>
//                     <Table className="border border-muted rounded-xl">
//                       <TableBody>
//                         {data.map(([label, value]) => (
//                           <TableRow
//                             key={label}
//                             className="md:text-base text-sm flex justify-between"
//                           >
//                             <TableCell className="font-medium">
//                               {label}
//                             </TableCell>
//                             <TableCell>{value || "-"}</TableCell>
//                           </TableRow>
//                         ))}
//                       </TableBody>
//                     </Table>
//                   </AccordionContent>
//                 </AccordionItem>
//               ))}
//             </Accordion>
//           </div>
//         </CardContent>
//       </Card>
//     </div>
//   );
// };

// export default WaterSupplyFeeTab;
