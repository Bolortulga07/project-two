import { Blogs } from "../../../db/models/blog.js";

export const createBlog = async (req, res) => {
  try {
    const { title, description, content } = req.body;
    const { userId } = req.user;
    const blog = await Blogs.create({
      title,
      description,
      content,
      userId,
    });
    res.send("blog posted");
  } catch (e) {
    res.send(e.message);
  }
};

export const getBlog = async (req, res) => {
  const { blogId } = req.params;
  const { title, description, content } = req.query;

  const blog = await Blogs.findOneAndUpdate(
    { _id: blogId },
    { $set: { title, description, content } }
  );

  res.send(blog);
};

export const profile = async (req, res) => {
  let { blogId, perPage = 10, page = 1 } = req.query;
  perPage = Number;
  page = Number;

  const blog = await Blogs.find({ blogId })
    .skip((page - 1) * perPage)
    .limit(perPage);

  res.send(blog);
};

export const detail = async (req, res) => {
  const { title } = req.query;
  const { blogId } = req.params;

  if (blogId) {
    const blog = await Blogs.findOne({
      title,
    });
    res.send(blog);
  }
};

export const deleteBlog = async (req, res) => {
  const { blogId } = req.params;

  const blog = await Blogs.findByIdAndDelete(blogId);
  res.send("blog deleted.");
};
