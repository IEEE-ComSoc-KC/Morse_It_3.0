import { prisma } from "@/lib/prisma";

export async function PUT(req: Request) {
  const { id } = await req.json();
  console.log("inside current qn", id);

  try {
    const user = await prisma.user.findUnique({
      where: { id },
    });
    if (!user) {
        return new Response(JSON.stringify({ message: "user not found" }), {
            status: 404,
        });
    }
    console.log("user in current qn", user)

    const answerFields = [
      "ans0",
      "ans1",
      "ans2",
      "ans3",
      "ans4",
      "ans5",
      "ans6",
    ];

    // Debug: print values
    for (const field of answerFields) {
      console.log(`${field}:`, user[field as keyof typeof user]);
    }

    const firstNullField = answerFields.find(
      (field) => user[field as keyof typeof user] === null
    );

    if (!firstNullField) {
      return new Response(null, { status: 204 });
    }


    return new Response(JSON.stringify({ nextQuestionField: firstNullField }), {
      status: 200,
    });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ message: "Internal Server Error" }), {
      status: 500,
    });
  }
}
