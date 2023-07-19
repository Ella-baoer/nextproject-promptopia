import { connectToDB } from "@/utils/database";
import Prompt from "@/models/prompt";

// GET(read)
export const GET = async (request, {params}) => {
  try {
    await connectToDB();

    const prompts = await Prompt.findById(params.id).populate("creator");
    console.log(JSON.stringify(prompts))
    if (!prompts) return new Response('Prompt not found', {status: 404})
    return new Response(JSON.stringify(prompts), { status: 200 });
  } catch (error) {
    return new Response("Faild to fetch all prompts", { status: 500 });
  }
};
// Patch
export const PATCH = async(request, {params}) => {
  const {prompt, tag} = await request.json()
  try {
    await connectToDB()

    const existedPromt = await Prompt.findById(params.id)
    if (!existedPromt)  return new Response('Prompt not found', {status: 404})

    existedPromt.prompt = prompt
    existedPromt.tag = tag
    await existedPromt.save()
    return new Response(JSON.stringify(existedPromt), {status: 200})
  } catch (error) {
    return new Response("Faild to fetch all prompts", { status: 500 });
  }
}
// Delete
export const DELETE = async(request, {params}) => {
  try {
    await connectToDB()
    await Prompt.findByIdAndRemove(params.id)
    return new Response("Prompt deleted successfully", {status: 200})
  } catch (error) {
    return new Response("Faild to deleted prompt", {status: 500})
  }
}