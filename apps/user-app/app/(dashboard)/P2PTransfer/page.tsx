import prisma from "@repo/database/client";
import { SendCard } from "../../../components/SendCard";
import { P2PTransaction } from "../../../components/P2PTransaction";
import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/auth";

async function getP2PTransactions() {
    const session = await getServerSession(authOptions);
    const txns = await prisma.p2pTransfer.findMany({
        where: {
            fromUserId: Number(session?.user?.id)
        }
    });
    return txns.map((t: { timestamp: any; amount: any; }) => ({
        time: t.timestamp,
        amount: t.amount,
    }))
}

export default async function () {
    const transactions = await getP2PTransactions()
    return <div className="w-full">
        <SendCard />
        <P2PTransaction transactions={transactions} />
    </div>
}