"use client"
import Drawer from '@mui/material/Drawer';
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function DeveloperDrawer({id, data=[]}) {
  const open = !!id && data.length > 0;
  const router = useRouter();

  const toggleDrawer = () => {
    router.back();
  };

  const DrawerList = (
    <div>
      {(data || []).map(proj => <div className='mb-1'>
        <Link href={`/project/${proj.url}`}>{proj.name}</Link>
      </div>)}
    </div>
  );

  return (
    <div>
      <Drawer open={open} onClose={toggleDrawer} anchor={'right'}>
        <div className='dev-container p-4'>
          <div className='heading mt-2 mb-4'>Projects Starting with {id}</div>
          {DrawerList}
        </div>
      </Drawer>
    </div>
  );
}