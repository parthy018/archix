
import MultiFileUpload from './MultiFileUpload';
import SliderImages from './SliderImages';
import { useSelector } from 'react-redux';
const Dashboard = () => {

  const {token}=useSelector((state)=>state.app)
  console.log(token);
  return (
    <div className="p-4 min-h-screen w-full">
        <div className="w-full  h-auto flex flex-col p-4 shadow-md">
        <h3 className='text-xl font-semibold my-2 '>Home Slider Images</h3>
         <SliderImages />
        </div>
      <div id="first" className="flex  flex-wrap w-full justify-start  md:h-fit min-h-max  my-4">
        <div className="w-full md:w-1/2 h-max ">
          <MultiFileUpload />
        </div>
      </div>
     
    </div>
  );
};

export default Dashboard;
