export default function CarDetails({ params }) {
    return (
      <div>
        <h2 className="text-3xl font-bold">
          Car ID: {params.id}
        </h2>
        <p>More car details will go here.</p>
      </div>
    );
  }
  