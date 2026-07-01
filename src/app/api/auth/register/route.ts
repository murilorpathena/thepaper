import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/appwrite/admin";
import { ID } from "appwrite";
import { COLLECTIONS, DATABASE_ID } from "@/lib/appwrite/client";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, password, documentType, document, companyName, phone } = body;

    if (!email || !password || !name || !documentType || !document) {
      return NextResponse.json({ error: "Campos obrigatórios faltando." }, { status: 400 });
    }

    if (!["cpf", "cnpj"].includes(documentType)) {
      return NextResponse.json({ error: "Tipo de documento inválido." }, { status: 400 });
    }

    if (password.length < 6) {
      return NextResponse.json({ error: "Senha deve ter no mínimo 6 caracteres." }, { status: 400 });
    }

    const { account, databases } = createAdminClient();

    const newUser = await account.create({
      userId: ID.unique(),
      email,
      password,
      name,
    });

    await databases.createDocument(DATABASE_ID, COLLECTIONS.AD_PROFILES, ID.unique(), {
      userId: newUser.$id,
      role: "advertiser",
      documentType,
      document,
      companyName: companyName ?? "",
      phone: phone ?? "",
      totalSpentCents: 0,
      isActive: true,
    });

    return NextResponse.json({ success: true, userId: newUser.$id }, { status: 201 });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Erro interno";
    if (message.includes("already exists") || message.includes("duplicate")) {
      return NextResponse.json({ error: "Email já cadastrado." }, { status: 409 });
    }
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
