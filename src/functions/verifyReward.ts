// src/functions/verifyReward.ts

import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';

// Mock interfaces - in a real project these would be imported from model files
interface Merchant {
  id: string;
  name: string;
  apiKey: string;
  isActive: boolean;
}

interface Transaction {
  id: string;
  merchantId: string;
  userId: string;
  amount: number;
  timestamp: Date;
}

interface Reward {
  id: string;
  transactionId: string;
  userId: string;
  merchantId: string;
  amount: number;
  status: 'pending' | 'issued' | 'failed';
  createdAt: Date;
}

// Mock data services - in a real project these would likely be proper DB connectors
const getMerchantByApiKey = async (apiKey: string): Promise<Merchant | null> => {
  // This would be a database lookup in reality
  const merchants: Merchant[] = [
    {
      id: 'merchant1',
      name: 'Example Store',
      apiKey: 'valid-api-key-123',
      isActive: true
    },
    {
      id: 'merchant2',
      name: 'Inactive Store',
      apiKey: 'inactive-key-456',
      isActive: false
    }
  ];
  
  return merchants.find(m => m.apiKey === apiKey) || null;
};

const getTransactionById = async (id: string): Promise<Transaction | null> => {
  // This would be a database lookup in reality
  if (id === 'valid-transaction-123') {
    return {
      id: 'valid-transaction-123',
      merchantId: 'merchant1',
      userId: 'user1',
      amount: 100.00,
      timestamp: new Date()
    };
  }
  return null;
};

const getRewardByTransactionId = async (transactionId: string): Promise<Reward | null> => {
  // This would be a database lookup in reality
  if (transactionId === 'valid-transaction-123') {
    return {
      id: 'reward123',
      transactionId: 'valid-transaction-123',
      userId: 'user1',
      merchantId: 'merchant1',
      amount: 5.00,
      status: 'issued',
      createdAt: new Date()
    };
  }
  return null;
};

/**
 * Lambda function handler for verifying transaction rewards
 * 
 * This function expects:
 * - An API key in the headers for merchant authentication
 * - A transaction ID in the query parameters
 * 
 * It returns:
 * - Reward information if the transaction has an associated reward
 * - Appropriate error messages for invalid requests or authentication issues
 */
export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  try {
    // TODO: Implement this function according to requirements
    
    // 1. Extract and validate API key from headers
    const merchant = await getMerchantByApiKey(event.headers['Authentication'].split(' ')[1]); // EG bearer: ...

    if (!merchant) {
      return {
        statusCode: 401,
        body: JSON.stringify({ message: 'Invalid API key' })
      };
    }
    // 2. Authenticate the merchant
    if (!merchant.isActive) {
      return {
        statusCode: 403,
        body: JSON.stringify({ message: 'Merchant account is not active' })
      }
    }
    
    // 3. Extract and validate the transaction ID

    const transactionId = event.queryStringParameters?.transactionId;
    if (!transactionId) {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: 'No transaction ID present' })
      }
    }

    const reward = await getRewardByTransactionId(transactionId);
    
    // 4. Verify the transaction belongs to the authenticated merchant

    if (!reward || reward.merchantId !== merchant.id) {
      // logger.warn(`Merchant ${merchant.id} attempted to access reward for transaction ${transactionId}`);
      return {
        statusCode: 404,
        body: JSON.stringify({ message: 'No reward found for this transaction ID' })
      }
    }
    
    // 5. Retrieve reward information
    const transaction = getTransactionById(reward.transactionId);
    if (!transaction) {
      // Log exception...
      return {
        statusCode: 500,
        body: JSON.stringify({ message: 'No transaction found for this reward' })
      }
    }
    
    // 6. Return appropriate response
    
    return {
      statusCode: 200,
      body: JSON.stringify({ 
        id: reward.id,
        merchantName: merchant.name,
        amount: reward.amount,
        transaction: transaction,
        status: reward.status
       })
    };
  } catch (error) {
    console.error('Error processing request:', error);
    // logger.log full data / Sentry.handleException...
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Internal server error' })
    };
  }
};
