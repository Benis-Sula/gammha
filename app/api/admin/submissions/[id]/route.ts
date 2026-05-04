import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { requireAdmin } from '@/lib/auth'

export async function GET(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const { error } = await requireAdmin()
  if (error) return error
  const { id } = await params
  const item = await prisma.contactSubmission.findUnique({ where: { id } })
  if (!item) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  return NextResponse.json(item)
}

export async function PATCH(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const { error } = await requireAdmin()
  if (error) return error
  const { id } = await params
  const item = await prisma.contactSubmission.update({ where: { id }, data: { read: true } })
  return NextResponse.json(item)
}

export async function DELETE(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const { error } = await requireAdmin()
  if (error) return error
  const { id } = await params
  await prisma.contactSubmission.delete({ where: { id } })
  return NextResponse.json({ ok: true })
}
