import { useParams } from "react-router-dom";

function DynamicPage() {
  const { setting } = useParams(); // מקבל את הפרמטר מהכתובת

  return (
    <div>
      <h1>עמוד {setting}</h1>
    </div>
  );
}

export default DynamicPage;
