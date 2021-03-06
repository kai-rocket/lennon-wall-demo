import { Post, Wall } from "../db/models";

export const createPost = async (req, res) => {
  const [newPost, associatedWall] = await Promise.all([
    Post.create({ value: req.body.value }),
    Wall.findByPk(req.body.wallId)
  ]);
  await newPost.setWall(associatedWall);
  res.send(newPost);
};

export const retrievePosts = async (req, res) => {
  const posts = await Post.findAll({
    where: {
      WallId: req.body.wallId
    }
  });
  res.send(posts);
};
