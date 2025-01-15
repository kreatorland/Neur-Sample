import { NextRequest, NextResponse } from 'next/server';

import { verifyUser } from '@/server/actions/user';
import { dbGetConversations } from '@/server/db/queries';

interface ConversationType {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
  title: string;
  visibility: boolean;
}
export async function GET(req: NextRequest) {
  try {
    const session = await verifyUser();
    const userId = session?.data?.data?.id;

    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    console.log('sss', userId, typeof userId);
    const conversations = await dbGetConversations({ userId });
    console.log('kkkk aayo', conversations);
    return NextResponse.json(conversations);
  } catch (error) {
    console.error('Error fetching conversations:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 },
    );
  }
}
