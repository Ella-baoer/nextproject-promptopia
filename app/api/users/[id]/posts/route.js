import { connectToDB } from "@/utils/database";
import Prompt from "@/models/prompt";

export const GET = async (request, {params}) => {
  try {
    await connectToDB();

    const prompts = await Prompt.find({creator: params.id}).populate("creator");
    console.log(JSON.stringify(prompts))
    return new Response(JSON.stringify(prompts), { status: 200 });
  } catch (error) {
    return new Response("Faild to fetch all prompts", { status: 500 });
  }
};
