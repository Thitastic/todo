const Skeleton = () => {
    return (
        <div className="skeleton">
            <div class="flex gap-10 w-full shadow-lg -shadow-lg rounded-md p-4 justify-between">
                <div class="flex animate-pulse flex-row items-center w-full h-full justify-start space-x-5">
                    <div class="w-8 bg-gray-500 h-8 rounded-full ">
                    </div>
                    <div className="flex justify-between w-11/12">
                    <div className="w-40 bg-gray-500 h-5 rounded-md inline-block"></div>
                    <div className="w-56 bg-gray-500 h-5 rounded-md inline-block"></div>
                    <div className="w-20 bg-gray-500 h-5 rounded-md inline-block"></div>
                    </div>
                </div>
            </div>
            <div class="flex gap-10 w-full shadow-lg -shadow-lg rounded-md p-4 justify-between">
                <div class="flex animate-pulse flex-row items-center w-full h-full justify-start space-x-5">
                    <div class="w-8 bg-gray-500 h-8 rounded-full ">
                    </div>
                    <div className="flex justify-between w-11/12">
                    <div className="w-40 bg-gray-500 h-5 rounded-md inline-block"></div>
                    <div className="w-56 bg-gray-500 h-5 rounded-md inline-block"></div>
                    <div className="w-20 bg-gray-500 h-5 rounded-md inline-block"></div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Skeleton