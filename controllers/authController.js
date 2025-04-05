import {
  registerUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
  loginUser,
} from "../services/authService.js";

export const handleRegister = async (req, res) => {
  try {
    const { user, token } = await registerUser(req.body);
    res.status(201).json({
      message: "User registered successfully",
      token,
      user: { id: user._id, username: user.username, email: user.email },
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const handleGetUsers = async (req, res) => {
  try {
    const users = await getUsers();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch users" });
  }
};

export const handleGetUserById = async (req, res) => {
  try {
    const user = await getUserById(req.params.id);
    res.status(200).json(user);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};

export const handleUpdateUser = async (req, res) => {
  try {
    const updatedUser = await updateUser(req.params.id, req.body);
    res.status(200).json({ message: "User updated", user: updatedUser });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const handleDeleteUser = async (req, res) => {
  try {
    const deletedUser = await deleteUser(req.params.id);
    res.status(200).json({ message: "User deleted", user: deletedUser });
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};

export const handleLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const { user, token } = await loginUser({ email, password });
    res.status(200).json({ message: "Login successful", user, token });
  } catch (err) {
    res.status(401).json({ error: err.message });
  }
};
