import { Suspense } from "react";
import { useParams } from "react-router-dom";
import getPet from "./getPet";

function DetailsParent() {
  const { id } = useParams();
  const resource = getPet(id);

  return (
    <Suspense fallback={<h2>loading …</h2>}>
      <Details resource={resource} />
    </Suspense>
  );
}

const Details = ({ resource }) => {
  const pet = resource.readData();

  return (
    <div className="details">
      <div>
        <h1>{pet.name}</h1>
        <h2>{`${pet.animal} — ${pet.breed} — ${pet.city}, ${pet.state}`}</h2>
        <button>Adopt {pet.name}</button>
        <p>{pet.description}</p>
      </div>
    </div>
  );
};

export default DetailsParent;
