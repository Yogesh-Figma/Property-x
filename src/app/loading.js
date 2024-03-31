import Image from "next/image"
export default function Loading({ isFullScreen = true}) {
    // You can add any UI inside Loading, including a Skeleton.
    return <div className={`${isFullScreen ? "default-loading-screen":""} d-flex align-items-center justify-content-center`}><Image alt="loader" src={"/infinityloader.gif"} width={200} height={200}/> </div>
  }