import { Hono } from "hono";
import { authMiddleware } from "../middleware/auth";
import { prisma } from "../prisma";

const plantRoute = new Hono();

plantRoute.use("*", authMiddleware);

// GET /plants
plantRoute.get("/", async (c) => {
  const user = c.get("user");

  const plants = await prisma.plant.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: "desc" },
  });

  return c.json(plants);
});

// POST /plants
plantRoute.post("/", async (c) => {
  const user = c.get("user");
  const body = await c.req.json();

  const plant = await prisma.plant.create({
    data: {
      ...body,
      userId: user.id,
    },
  });

  return c.json(plant, 201);
});


// PUT /plants/:id
plantRoute.put("/:id", async (c) => {
  const user = c.get("user");
  const id = Number(c.req.param("id"));

  if (Number.isNaN(id)) {
    return c.json({ error: "Invalid plant id" }, 400);
  }

  const body = await c.req.json();

  // Check ownership
  const existingPlant = await prisma.plant.findFirst({
    where: {
      id,
      userId: user.id,
    },
  });

  if (!existingPlant) {
    return c.json({ error: "Plant not found" }, 404);
  }

  const updatedPlant = await prisma.plant.update({
    where: { id },
    data: {
      ...(body.name !== undefined && { name: body.name }),
      ...(body.description !== undefined && { description: body.description }),
      ...(body.category !== undefined && { category: body.category }),
      ...(body.stock !== undefined && { stock: body.stock }),
      ...(body.price !== undefined && { price: body.price }),
      ...(body.imageUrl !== undefined && { imageUrl: body.imageUrl }),
    },
  });

  return c.json({
    success: true,
    data: updatedPlant,
  });
});

// DELETE /plants/:id
plantRoute.delete("/:id", async (c) => {
  const user = c.get("user");
  const id = Number(c.req.param("id"));

  await prisma.plant.deleteMany({
    where: {
      id,
      userId: user.id,
    },
  });

  return c.json({ success: true });
});

export default plantRoute;
