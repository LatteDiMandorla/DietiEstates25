import React, { useState } from "react";
import { FaStar } from "react-icons/fa"; // Usa react-icons per le stelle

const StarRating: React.FC = () => {
  const [rating, setRating] = useState(0); // Stato per il valore del punteggio
  const [hover, setHover] = useState(0);   // Stato per il valore dell'hover

  return (
    <div className="flex space-x-1">
      {/* Array da 1 a 5 per generare le stelle */}
      {Array.from({ length: 5 }, (_, i) => i + 1).map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => setRating(star)} // Assegna il valore del punteggio al click
          onMouseEnter={() => setHover(star)} // Cambia il valore dell'hover
          onMouseLeave={() => setHover(0)} // Reset dell'hover
          className="focus:outline-none"
        >
          <FaStar
            size={24} // Dimensione della stella
            className={`transition-colors duration-200 ${
              (hover || rating) >= star ? "text-yellow-400" : "text-gray-300"
            }`}
          />
        </button>
      ))}
    </div>
  );
};

export default StarRating;
