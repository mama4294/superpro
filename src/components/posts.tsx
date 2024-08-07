import { database } from "@/db";
import { Button } from "./ui/button";
import Post from "@/model/post";

function Posts() {
  //   const postsCollection = database.get("posts");
  //   console.log(postsCollection);

  async function addPost() {
    await database.write(async () => {
      await database.get<Post>("posts").create((post) => {
        post.title = "New post";
        post.body = "Lorem ipsum...";
      });
    });
  }

  return (
    <div>
      <h1>Posts</h1>
      <Button onClick={addPost}>Add Post</Button>
    </div>
  );
}

export default Posts;
