import { PublicKey } from '@solana/web3.js';
import { z } from 'zod';

import NftList from '@/components/message/nft-list';
import { LaunchResult } from '@/components/message/pumpfun-launch';
import { Card } from '@/components/ui/card';
import { retrieveAgentKit } from '@/server/actions/ai';

export const NFTDetails = {
  listNFT: {
    agentKit: null,
    description: 'List NFT on Magic eden',
    displayName: 'List NFT',
    parameters: z.object({
      price: z.number(),
      address: z.string(),
    }),
    execute: async function ({
      price,
      address,
    }: {
      price: number;
      address: string;
    }) {
      try {
        const agent =
          this.agentKit ||
          (await retrieveAgentKit(undefined))?.data?.data?.agent;

        if (!agent) {
          return { success: false, error: 'Failed to retrieve agent' };
        }

        const result = await agent.tensorListNFT(new PublicKey(address), price);

        return { success: true, data: result };
      } catch (error) {
        return {
          success: false,
          error:
            error instanceof Error ? error.message : 'Failed to launch token',
        };
      }
    },
    render: (result: unknown) => {
      const typedResult = result as {
        success: boolean;
        data: any;
        error?: string;
      };

      if (!typedResult.success) {
        return (
          <Card className="bg-destructive/10 p-6">
            <h2 className="mb-2 text-xl font-semibold text-destructive">
              NFT List failed
            </h2>
            <pre className="text-sm text-destructive/80">
              {JSON.stringify(typedResult, null, 2)}
            </pre>
          </Card>
        );
      }

      const data = typedResult.data as {
        signature: string;
        mint: string;
        metadataUri: string;
      };
      return <NftList />;
    },
  },
};
