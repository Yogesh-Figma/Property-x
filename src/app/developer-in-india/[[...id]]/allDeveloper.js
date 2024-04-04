"use client"
import Drawer from '@mui/material/Drawer';
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function DeveloperDrawer({id, data=[]}) {
  const open = !!id;
  const router = useRouter();

  const toggleDrawer = () => {
    router.back();
  };

  const DrawerList = (
    <div>
      {Array.from(Array(10).keys()).map(a =>data.map(item => <div className='mb-1'><Link href={"/"}>{item}</Link></div>))}
    </div>
  );

  return (
    <div>
      <Drawer open={open} onClose={toggleDrawer} anchor={'right'}>
        <div className='dev-container p-4'>
          <div className='heading mt-2 mb-4'>Builders Starting with {id}</div>
          {DrawerList}
        </div>
      </Drawer>
    </div>
  );
}