import { useEffect, useState } from "react";
import { ideasAPI } from "../services/api";

function Ideas() {
  const [ideas, setIdeas] = useState([]);

  // get ideas from backend
  useEffect(() => {
    async function loadIdeas() {
      const ideas = await ideasAPI.getIdeas();
      setIdeas(ideas);
    }

    loadIdeas();
  }, []);

  // delete idea
  async function handleDelete(id) {
    const res = await ideasAPI.deleteIdea(id);

    if (res.success) {
      // remove from screen
      setIdeas(ideas.filter((idea) => idea._id !== id));
    }
  }

  return (
    <div>
      <h2>My Ideas</h2>

      {ideas.map((idea) => (
        <div key={idea._id} style={{ border: "1px solid white", margin: "10px", padding: "10px" }}>
          
          <h4>{idea.niche} - {idea.mood}</h4>
          
          <p>{idea.content}</p>

          <button onClick={() => handleDelete(idea._id)}>
            Delete
          </button>

        </div>
      ))}
    </div>
  );
}

export default Ideas;