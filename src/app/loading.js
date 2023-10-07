import Image from "next/image"
export default function Loading() {
    // You can add any UI inside Loading, including a Skeleton.
    return <div className="default-loading-screen d-flex align-items-center justify-content-center"><Image src={"/infinityloader.gif"} width={200} height={200}/> </div>
  }