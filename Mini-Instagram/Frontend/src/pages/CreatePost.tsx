import axios from "axios";
import { useNavigate } from "react-router-dom";

const CreatePost = () => {
  const navigate = useNavigate();
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const imageFile = formData.get("image") as File;
    const caption = formData.get("caption") as string;

    if (!imageFile || !caption) {
      alert("Please provide both an image and a caption.");
      return;
    }

    const postData = new FormData();
    postData.append("image", imageFile);
    postData.append("caption", caption);

    axios
      .post("http://localhost:3000/create-post", postData)
      .then((response) => {
        navigate("/feed");
        e.currentTarget.reset();
        alert(response.data.message || "Post created successfully!");
      })
      .catch((error) => {
        console.error("Error creating post:", error);
      });
  };

  return (
    <section className="create-post-section">
      <h1>Create Post</h1>

      <form onSubmit={handleSubmit} className="create-post-form">
        <input type="file" name="image" accept="image/*" />
        <input
          type="text"
          placeholder="Enter caption"
          name="caption"
          required
        />
        <button type="submit" className="create-post-button">
          Submit
        </button>
      </form>
    </section>
  );
};

export default CreatePost;
