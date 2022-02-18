import { Suspense, useState, lazy, useContext } from "react";
import { useParams } from "react-router-dom";
import getPet from "./getPet";
import Carousel from "./Carousel";
import ErrorBoundary from "./ErrorBoundary";
import BrowserContext from "./BrowserContext";

const Modal = lazy(() => import("./Modal"));

function DetailsParent() {
  const isBrowser = useContext(BrowserContext);
  const { id } = useParams();
  const resource = getPet(id, isBrowser);

  return (
    <Suspense fallback={<h2>loading …</h2>}>
      <Details resource={resource} />
    </Suspense>
  );
}

const Details = ({ resource }) => {
  const pet = resource.readData();
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="details">
      <Carousel images={pet.images} />
      <div>
        <h1>{pet.name}</h1>
        <h2>{`${pet.animal} — ${pet.breed} — ${pet.city}, ${pet.state}`}</h2>
        <button onClick={() => setShowModal(true)}>Adopt {pet.name}</button>
        <p>{pet.description}</p>
        {showModal ? (
          <Modal>
            <div>
              <h1>Would you like to adopt {pet.name}?</h1>
              <div className="buttons">
                <a href="https://bit.ly/pet-adopt">Yes</a>
                <button onClick={() => setShowModal(false)}>No</button>
              </div>
            </div>
          </Modal>
        ) : null}
      </div>
    </div>
  );
};

export default function DetailsErrorBoundary(props) {
  return (
    <ErrorBoundary>
      <DetailsParent {...props} />
    </ErrorBoundary>
  );
}
