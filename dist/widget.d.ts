import { Abi } from 'abitype';
import { AccessList } from 'viem';
import { Account } from 'viem';
import { AddChainParameters } from 'viem';
import { AddEthereumChainParameter } from 'viem';
import { Address } from 'abitype';
import { BlobSidecar } from 'viem';
import { BlockTag } from 'viem';
import { ByteArray } from 'viem';
import { Capabilities } from 'viem';
import { Chain } from 'viem';
import { ChainFees } from 'viem';
import { Client } from 'viem';
import { ClientConfig } from 'viem';
import { ContractFunctionArgs } from 'viem';
import { ContractFunctionName } from 'viem';
import { CustomTransport } from 'viem';
import { DeployContractParameters } from 'viem';
import { DeployContractReturnType } from 'viem';
import { DeriveAccount } from 'viem';
import { DeriveChain } from 'viem';
import { EIP1193RequestFn } from 'viem';
import { ExactPartial } from 'viem';
import { ExtractChainFormatterParameters } from 'viem';
import { FeeValuesEIP1559 } from 'viem';
import { FeeValuesEIP4844 } from 'viem';
import { FeeValuesLegacy } from 'viem';
import { GetAddressesReturnType } from 'viem';
import { GetCallsStatusParameters } from 'viem';
import { GetCallsStatusReturnType } from 'viem';
import { GetCapabilitiesParameters } from 'viem';
import { GetCapabilitiesReturnType } from 'viem';
import { GetChainIdReturnType } from 'viem';
import { GetPermissionsReturnType } from 'viem';
import { GetTransactionType } from 'viem';
import { Hash } from 'viem';
import { Hex } from 'viem';
import { IsNever } from 'viem';
import { Log } from 'viem';
import { NetworkSync } from 'viem';
import { OneOf } from 'viem';
import { OpStackRpcBlock } from 'viem/chains';
import { OpStackRpcTransaction } from 'viem/chains';
import { OpStackRpcTransactionReceipt } from 'viem/chains';
import { OpStackTransaction } from 'viem/chains';
import { PrepareAuthorizationParameters } from 'viem';
import { PrepareAuthorizationReturnType } from 'viem';
import { PrepareTransactionRequestParameters } from 'viem';
import { PrepareTransactionRequestParameterType } from 'viem';
import { PrepareTransactionRequestRequest } from 'viem';
import { Prettify } from 'viem';
import { PublicActions } from 'viem';
import { Quantity } from 'viem';
import { RequestAddressesReturnType } from 'viem';
import { RequestPermissionsParameters } from 'viem';
import { RequestPermissionsReturnType } from 'viem';
import { RpcBlockNumber } from 'viem';
import { RpcStateOverride } from 'viem';
import { RpcTransactionReceipt } from 'viem';
import { RpcTransactionRequest } from 'viem';
import { SendCallsParameters } from 'viem';
import { SendCallsSyncParameters } from 'viem';
import { SendRawTransactionParameters } from 'viem';
import { SendRawTransactionReturnType } from 'viem';
import { SendRawTransactionSyncParameters } from 'viem';
import { SendTransactionParameters } from 'viem';
import { SendTransactionRequest } from 'viem';
import { SendTransactionReturnType } from 'viem';
import { SendTransactionSyncParameters } from 'viem';
import { SendTransactionSyncRequest } from 'viem';
import { SendTransactionSyncReturnType } from 'viem';
import { serializeTransactionOpStack } from 'viem/chains';
import { ShowCallsStatusParameters } from 'viem';
import { ShowCallsStatusReturnType } from 'viem';
import { SignAuthorizationParameters } from 'viem';
import { SignAuthorizationReturnType } from 'viem';
import { SignedAuthorizationList } from 'viem';
import { SignMessageParameters } from 'viem';
import { SignMessageReturnType } from 'viem';
import { SignTransactionParameters } from 'viem';
import { SignTypedDataParameters } from 'viem';
import { SignTypedDataReturnType } from 'viem';
import { SwitchChainParameters } from 'viem';
import { TransactionRequest } from 'viem';
import { TransactionRequestEIP1559 } from 'viem';
import { TransactionRequestEIP2930 } from 'viem';
import { TransactionRequestEIP4844 } from 'viem';
import { TransactionRequestEIP7702 } from 'viem';
import { TransactionRequestLegacy } from 'viem';
import { TransactionSerializableEIP2930 } from 'viem';
import { TransactionSerializableEIP4844 } from 'viem';
import { TransactionSerializableEIP7702 } from 'viem';
import { TransactionSerialized } from 'viem';
import { TransactionSerializedLegacy } from 'viem';
import { TransactionType } from 'viem';
import { TransportConfig } from 'viem';
import { TypedDataParameter } from 'abitype';
import { UnionOmit } from 'viem';
import { UnionRequiredBy } from 'viem';
import { WaitForCallsStatusParameters } from 'viem';
import { WaitForCallsStatusReturnType } from 'viem';
import { WalletActions } from 'viem';
import { WalletCallReceipt } from 'viem';
import { WalletCapabilitiesRecord } from 'viem';
import { WalletGetAssetsParameters } from 'viem';
import { WalletGetAssetsReturnType } from 'viem';
import { WalletGetCallsStatusReturnType } from 'viem';
import { WalletGrantPermissionsParameters } from 'viem';
import { WalletGrantPermissionsReturnType } from 'viem';
import { WalletPermission } from 'viem';
import { WalletSendCallsParameters } from 'viem';
import { WalletSendCallsReturnType } from 'viem';
import { WatchAssetParameters } from 'viem';
import { WatchAssetParams } from 'viem';
import { WatchAssetReturnType } from 'viem';
import { Withdrawal } from 'viem';
import { WriteContractParameters } from 'viem';
import { WriteContractReturnType } from 'viem';
import { WriteContractSyncParameters } from 'viem';
import { WriteContractSyncReturnType } from 'viem';

/**
 * @typedef {Object} CryptoMeACoffeeConfig@typedef {Object} CryptoMeACoffeeConfig
 * @property {string} walletAddress - Recipient wallet address (required)
 * @property {string} apiEndpoint - Backend API endpoint URL (required)
 * @property {string} [creatorName='this creator'] - Display name for the creator
 * @property {string} [message='Thanks for the coffee!'] - Thank you message after donation
 * @property {string} [color='#5F7FFF'] - Primary color for the widget
 * @property {'Left' | 'Right'} [position='Right'] - Widget position on screen
 * @property {string | number} [xMargin='18'] - Horizontal margin in pixels
 * @property {string | number} [yMargin='18'] - Vertical margin in pixels
 * @property {number[]} [presetAmounts=[1, 3, 5]] - Preset donation amounts in USD
 * @property {'light' | 'dark'} [theme='light'] - Widget theme
 * @property {'base-sepolia' | 'base'} [network='base-sepolia'] - Blockchain network
 * @property {string} [logoUrl] - Custom logo URL
 * @property {number} [minAmount=0.01] - Minimum donation amount in USD
 * @property {number} [maxAmount=1000000] - Maximum donation amount in USD
 */
/**
 * CryptoMeACoffee Widget
 * Accept USDC donations on your website via x402 protocol
 * @class
 */
declare class CryptoMeACoffee {
    static escapeHTML(str: any): string;
    /**
     * Create a new CryptoMeACoffee widget instance
     * @param {CryptoMeACoffeeConfig} config - Widget configuration
     */
    constructor(config?: CryptoMeACoffeeConfig);
    config: {
        /**
         * - Recipient wallet address (required)
         */
        walletAddress: string;
        /**
         * - Backend API endpoint URL (required)
         */
        apiEndpoint: string;
        /**
         * - Display name for the creator
         */
        creatorName: string;
        /**
         * - Thank you message after donation
         */
        message: string;
        /**
         * - Primary color for the widget
         */
        color: string;
        /**
         * - Widget position on screen
         */
        position: "Left" | "Right";
        /**
         * - Horizontal margin in pixels
         */
        xMargin: string | number;
        /**
         * - Vertical margin in pixels
         */
        yMargin: string | number;
        /**
         * - Preset donation amounts in USD
         */
        presetAmounts: number[];
        /**
         * - Widget theme
         */
        theme: "light" | "dark";
        /**
         * - Blockchain network
         */
        network: "base-sepolia" | "base";
        /**
         * - Custom logo URL
         */
        logoUrl: string;
        /**
         * - Minimum donation amount in USD
         */
        minAmount: number;
        /**
         * - Maximum donation amount in USD
         */
        maxAmount: number;
    };
    state: {
        modalOpen: boolean;
        connected: boolean;
        loading: boolean;
        error: any;
        selectedAmount: any;
        customAmount: string;
        userAddress: any;
        currentChainId: any;
        message: string;
    };
    elements: {};
    walletClient: {
        account: any;
        batch?: ClientConfig["batch"] | undefined;
        cacheTime: number;
        ccipRead?: ClientConfig["ccipRead"] | undefined;
        chain: any;
        experimental_blockTag?: BlockTag | undefined;
        key: string;
        name: string;
        pollingInterval: number;
        request: EIP1193RequestFn<[{
        Method: "eth_accounts";
        Parameters?: undefined;
        ReturnType: Address[];
        }, {
        Method: "eth_chainId";
        Parameters?: undefined;
        ReturnType: Quantity;
        }, {
        Method: "eth_estimateGas";
        Parameters: [transaction: RpcTransactionRequest] | [transaction: RpcTransactionRequest, block: RpcBlockNumber | BlockTag] | [transaction: RpcTransactionRequest, block: RpcBlockNumber | BlockTag, stateOverride: RpcStateOverride];
        ReturnType: Quantity;
        }, {
        Method: "eth_requestAccounts";
        Parameters?: undefined;
        ReturnType: Address[];
        }, {
        Method: "eth_sendTransaction";
        Parameters: [transaction: RpcTransactionRequest];
        ReturnType: Hash;
        }, {
        Method: "eth_sendRawTransaction";
        Parameters: [signedTransaction: Hex];
        ReturnType: Hash;
        }, {
        Method: "eth_sendRawTransactionSync";
        Parameters: [signedTransaction: Hex] | [signedTransaction: Hex, timeout: Hex];
        ReturnType: RpcTransactionReceipt;
        }, {
        Method: "eth_sign";
        Parameters: [address: Address, data: Hex];
        ReturnType: Hex;
        }, {
        Method: "eth_signTransaction";
        Parameters: [request: RpcTransactionRequest];
        ReturnType: Hex;
        }, {
        Method: "eth_signTypedData_v4";
        Parameters: [address: Address, message: string];
        ReturnType: Hex;
        }, {
        Method: "eth_syncing";
        Parameters?: undefined;
        ReturnType: NetworkSync | false;
        }, {
        Method: "personal_sign";
        Parameters: [data: Hex, address: Address];
        ReturnType: Hex;
        }, {
        Method: "wallet_addEthereumChain";
        Parameters: [chain: AddEthereumChainParameter];
        ReturnType: null;
        }, {
        Method: "wallet_addSubAccount";
        Parameters: [{
        account: OneOf<    {
        keys: readonly {
        publicKey: Hex;
        type: "address" | "p256" | "webcrypto-p256" | "webauthn-p256";
        }[];
        type: "create";
        } | {
        address: Address;
        chainId?: number | undefined;
        type: "deployed";
        } | {
        address: Address;
        chainId?: number | undefined;
        factory: Address;
        factoryData: Hex;
        type: "undeployed";
        }>;
        version: string;
        }];
        ReturnType: {
        address: Address;
        factory?: Address | undefined;
        factoryData?: Hex | undefined;
        };
        }, {
        Method: "wallet_connect";
        Parameters: [{
        capabilities?: Capabilities | undefined;
        version: string;
        }];
        ReturnType: {
        accounts: readonly {
        address: Address;
        capabilities?: Capabilities | undefined;
        }[];
        };
        }, {
        Method: "wallet_disconnect";
        Parameters?: undefined;
        ReturnType: void;
        }, {
        Method: "wallet_getAssets";
        Parameters?: [WalletGetAssetsParameters];
        ReturnType: WalletGetAssetsReturnType;
        }, {
        Method: "wallet_getCallsStatus";
        Parameters?: [string];
        ReturnType: WalletGetCallsStatusReturnType;
        }, {
        Method: "wallet_getCapabilities";
        Parameters?: readonly [] | readonly [Address | undefined] | readonly [Address | undefined, readonly Hex[] | undefined] | undefined;
        ReturnType: Prettify<WalletCapabilitiesRecord>;
        }, {
        Method: "wallet_getPermissions";
        Parameters?: undefined;
        ReturnType: WalletPermission[];
        }, {
        Method: "wallet_grantPermissions";
        Parameters?: [WalletGrantPermissionsParameters];
        ReturnType: Prettify<WalletGrantPermissionsReturnType>;
        }, {
        Method: "wallet_requestPermissions";
        Parameters: [permissions: {
        eth_accounts: Record<string, any>;
        }];
        ReturnType: WalletPermission[];
        }, {
        Method: "wallet_revokePermissions";
        Parameters: [permissions: {
        eth_accounts: Record<string, any>;
        }];
        ReturnType: null;
        }, {
        Method: "wallet_sendCalls";
        Parameters?: WalletSendCallsParameters;
        ReturnType: WalletSendCallsReturnType;
        }, {
        Method: "wallet_sendTransaction";
        Parameters: [transaction: RpcTransactionRequest];
        ReturnType: Hash;
        }, {
        Method: "wallet_showCallsStatus";
        Parameters?: [string];
        ReturnType: void;
        }, {
        Method: "wallet_switchEthereumChain";
        Parameters: [chain: {
        chainId: string;
        }];
        ReturnType: null;
        }, {
        Method: "wallet_watchAsset";
        Parameters: WatchAssetParams;
        ReturnType: boolean;
        }, ...any[]]>;
        transport: TransportConfig<"custom", EIP1193RequestFn>;
        type: string;
        uid: string;
        addChain: (args: AddChainParameters) => Promise<void>;
        deployContract: <const abi extends Abi | readonly unknown[], chainOverride extends Chain | undefined>(args: DeployContractParameters<abi, any, any, chainOverride>) => Promise<DeployContractReturnType>;
        getAddresses: () => Promise<GetAddressesReturnType>;
        getCallsStatus: (parameters: GetCallsStatusParameters) => Promise<GetCallsStatusReturnType>;
        getCapabilities: <chainId extends number | undefined>(parameters?: GetCapabilitiesParameters<chainId>) => Promise<GetCapabilitiesReturnType<chainId>>;
        getChainId: () => Promise<GetChainIdReturnType>;
        getPermissions: () => Promise<GetPermissionsReturnType>;
        prepareAuthorization: (parameters: PrepareAuthorizationParameters<any>) => Promise<PrepareAuthorizationReturnType>;
        prepareTransactionRequest: <const request extends PrepareTransactionRequestRequest<any, chainOverride>, chainOverride extends Chain | undefined = undefined, accountOverride extends Account | Address | undefined = undefined>(args: PrepareTransactionRequestParameters<any, any, chainOverride, accountOverride, request>) => Promise<UnionRequiredBy<Extract<UnionOmit<ExtractChainFormatterParameters<DeriveChain<any, chainOverride>, "transactionRequest", TransactionRequest>, "from"> & (DeriveChain<any, chainOverride> extends infer T_1 ? T_1 extends DeriveChain<any, chainOverride> ? T_1 extends Chain ? {
        chain: T_1;
        } : {
        chain?: undefined;
        } : never : never) & (DeriveAccount<any, accountOverride> extends infer T_2 ? T_2 extends DeriveAccount<any, accountOverride> ? T_2 extends Account ? {
        account: T_2;
        from: Address;
        } : {
        account?: undefined;
        from?: undefined;
        } : never : never), IsNever<((request["type"] extends string ? request["type"] : GetTransactionType<request, (request extends {
        accessList?: undefined;
        authorizationList?: undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: bigint;
        sidecars?: undefined;
        } & FeeValuesLegacy ? "legacy" : never) | (request extends {
        accessList?: AccessList;
        authorizationList?: undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: undefined;
        maxFeePerBlobGas?: undefined;
        maxFeePerGas?: bigint;
        maxPriorityFeePerGas?: bigint;
        sidecars?: undefined;
        } & (OneOf<    {
        maxFeePerGas: FeeValuesEIP1559["maxFeePerGas"];
        } | {
        maxPriorityFeePerGas: FeeValuesEIP1559["maxPriorityFeePerGas"];
        }, FeeValuesEIP1559> & {
        accessList?: TransactionSerializableEIP2930["accessList"] | undefined;
        }) ? "eip1559" : never) | (request extends {
        accessList?: AccessList;
        authorizationList?: undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: bigint;
        sidecars?: undefined;
        maxFeePerBlobGas?: undefined;
        maxFeePerGas?: undefined;
        maxPriorityFeePerGas?: undefined;
        } & {
        accessList: TransactionSerializableEIP2930["accessList"];
        } ? "eip2930" : never) | (request extends ({
        accessList?: AccessList;
        authorizationList?: undefined;
        blobs?: readonly `0x${string}`[] | readonly ByteArray[];
        blobVersionedHashes?: readonly `0x${string}`[];
        maxFeePerBlobGas?: bigint;
        maxFeePerGas?: bigint;
        maxPriorityFeePerGas?: bigint;
        sidecars?: false | readonly BlobSidecar<`0x${string}`>[];
        } | {
        accessList?: AccessList;
        authorizationList?: undefined;
        blobs?: readonly `0x${string}`[] | readonly ByteArray[];
        blobVersionedHashes?: readonly `0x${string}`[];
        maxFeePerBlobGas?: bigint;
        maxFeePerGas?: bigint;
        maxPriorityFeePerGas?: bigint;
        sidecars?: false | readonly BlobSidecar<`0x${string}`>[];
        }) & (ExactPartial<FeeValuesEIP4844> & OneOf<    {
        blobs: TransactionSerializableEIP4844["blobs"];
        } | {
        blobVersionedHashes: TransactionSerializableEIP4844["blobVersionedHashes"];
        } | {
        sidecars: TransactionSerializableEIP4844["sidecars"];
        }, TransactionSerializableEIP4844>) ? "eip4844" : never) | (request extends ({
        accessList?: AccessList;
        authorizationList?: SignedAuthorizationList;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: undefined;
        maxFeePerBlobGas?: undefined;
        maxFeePerGas?: bigint;
        maxPriorityFeePerGas?: bigint;
        sidecars?: undefined;
        } | {
        accessList?: AccessList;
        authorizationList?: SignedAuthorizationList;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: undefined;
        maxFeePerBlobGas?: undefined;
        maxFeePerGas?: bigint;
        maxPriorityFeePerGas?: bigint;
        sidecars?: undefined;
        }) & {
        authorizationList: TransactionSerializableEIP7702["authorizationList"];
        } ? "eip7702" : never) | (request["type"] extends string ? Extract<request["type"], string> : never)> extends "legacy" ? unknown : GetTransactionType<request, (request extends {
        accessList?: undefined;
        authorizationList?: undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: bigint;
        sidecars?: undefined;
        } & FeeValuesLegacy ? "legacy" : never) | (request extends {
        accessList?: AccessList;
        authorizationList?: undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: undefined;
        maxFeePerBlobGas?: undefined;
        maxFeePerGas?: bigint;
        maxPriorityFeePerGas?: bigint;
        sidecars?: undefined;
        } & (OneOf<    {
        maxFeePerGas: FeeValuesEIP1559["maxFeePerGas"];
        } | {
        maxPriorityFeePerGas: FeeValuesEIP1559["maxPriorityFeePerGas"];
        }, FeeValuesEIP1559> & {
        accessList?: TransactionSerializableEIP2930["accessList"] | undefined;
        }) ? "eip1559" : never) | (request extends {
        accessList?: AccessList;
        authorizationList?: undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: bigint;
        sidecars?: undefined;
        maxFeePerBlobGas?: undefined;
        maxFeePerGas?: undefined;
        maxPriorityFeePerGas?: undefined;
        } & {
        accessList: TransactionSerializableEIP2930["accessList"];
        } ? "eip2930" : never) | (request extends ({
        accessList?: AccessList;
        authorizationList?: undefined;
        blobs?: readonly `0x${string}`[] | readonly ByteArray[];
        blobVersionedHashes?: readonly `0x${string}`[];
        maxFeePerBlobGas?: bigint;
        maxFeePerGas?: bigint;
        maxPriorityFeePerGas?: bigint;
        sidecars?: false | readonly BlobSidecar<`0x${string}`>[];
        } | {
        accessList?: AccessList;
        authorizationList?: undefined;
        blobs?: readonly `0x${string}`[] | readonly ByteArray[];
        blobVersionedHashes?: readonly `0x${string}`[];
        maxFeePerBlobGas?: bigint;
        maxFeePerGas?: bigint;
        maxPriorityFeePerGas?: bigint;
        sidecars?: false | readonly BlobSidecar<`0x${string}`>[];
        }) & (ExactPartial<FeeValuesEIP4844> & OneOf<    {
        blobs: TransactionSerializableEIP4844["blobs"];
        } | {
        blobVersionedHashes: TransactionSerializableEIP4844["blobVersionedHashes"];
        } | {
        sidecars: TransactionSerializableEIP4844["sidecars"];
        }, TransactionSerializableEIP4844>) ? "eip4844" : never) | (request extends ({
        accessList?: AccessList;
        authorizationList?: SignedAuthorizationList;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: undefined;
        maxFeePerBlobGas?: undefined;
        maxFeePerGas?: bigint;
        maxPriorityFeePerGas?: bigint;
        sidecars?: undefined;
        } | {
        accessList?: AccessList;
        authorizationList?: SignedAuthorizationList;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: undefined;
        maxFeePerBlobGas?: undefined;
        maxFeePerGas?: bigint;
        maxPriorityFeePerGas?: bigint;
        sidecars?: undefined;
        }) & {
        authorizationList: TransactionSerializableEIP7702["authorizationList"];
        } ? "eip7702" : never) | (request["type"] extends string ? Extract<request["type"], string> : never)>) extends infer T_3 ? T_3 extends (request["type"] extends string ? request["type"] : GetTransactionType<request, (request extends {
        accessList?: undefined;
        authorizationList?: undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: bigint;
        sidecars?: undefined;
        } & FeeValuesLegacy ? "legacy" : never) | (request extends {
        accessList?: AccessList;
        authorizationList?: undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: undefined;
        maxFeePerBlobGas?: undefined;
        maxFeePerGas?: bigint;
        maxPriorityFeePerGas?: bigint;
        sidecars?: undefined;
        } & (OneOf<    {
        maxFeePerGas: FeeValuesEIP1559["maxFeePerGas"];
        } | {
        maxPriorityFeePerGas: FeeValuesEIP1559["maxPriorityFeePerGas"];
        }, FeeValuesEIP1559> & {
        accessList?: TransactionSerializableEIP2930["accessList"] | undefined;
        }) ? "eip1559" : never) | (request extends {
        accessList?: AccessList;
        authorizationList?: undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: bigint;
        sidecars?: undefined;
        maxFeePerBlobGas?: undefined;
        maxFeePerGas?: undefined;
        maxPriorityFeePerGas?: undefined;
        } & {
        accessList: TransactionSerializableEIP2930["accessList"];
        } ? "eip2930" : never) | (request extends ({
        accessList?: AccessList;
        authorizationList?: undefined;
        blobs?: readonly `0x${string}`[] | readonly ByteArray[];
        blobVersionedHashes?: readonly `0x${string}`[];
        maxFeePerBlobGas?: bigint;
        maxFeePerGas?: bigint;
        maxPriorityFeePerGas?: bigint;
        sidecars?: false | readonly BlobSidecar<`0x${string}`>[];
        } | {
        accessList?: AccessList;
        authorizationList?: undefined;
        blobs?: readonly `0x${string}`[] | readonly ByteArray[];
        blobVersionedHashes?: readonly `0x${string}`[];
        maxFeePerBlobGas?: bigint;
        maxFeePerGas?: bigint;
        maxPriorityFeePerGas?: bigint;
        sidecars?: false | readonly BlobSidecar<`0x${string}`>[];
        }) & (ExactPartial<FeeValuesEIP4844> & OneOf<    {
        blobs: TransactionSerializableEIP4844["blobs"];
        } | {
        blobVersionedHashes: TransactionSerializableEIP4844["blobVersionedHashes"];
        } | {
        sidecars: TransactionSerializableEIP4844["sidecars"];
        }, TransactionSerializableEIP4844>) ? "eip4844" : never) | (request extends ({
        accessList?: AccessList;
        authorizationList?: SignedAuthorizationList;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: undefined;
        maxFeePerBlobGas?: undefined;
        maxFeePerGas?: bigint;
        maxPriorityFeePerGas?: bigint;
        sidecars?: undefined;
        } | {
        accessList?: AccessList;
        authorizationList?: SignedAuthorizationList;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: undefined;
        maxFeePerBlobGas?: undefined;
        maxFeePerGas?: bigint;
        maxPriorityFeePerGas?: bigint;
        sidecars?: undefined;
        }) & {
        authorizationList: TransactionSerializableEIP7702["authorizationList"];
        } ? "eip7702" : never) | (request["type"] extends string ? Extract<request["type"], string> : never)> extends "legacy" ? unknown : GetTransactionType<request, (request extends {
        accessList?: undefined;
        authorizationList?: undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: bigint;
        sidecars?: undefined;
        } & FeeValuesLegacy ? "legacy" : never) | (request extends {
        accessList?: AccessList;
        authorizationList?: undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: undefined;
        maxFeePerBlobGas?: undefined;
        maxFeePerGas?: bigint;
        maxPriorityFeePerGas?: bigint;
        sidecars?: undefined;
        } & (OneOf<    {
        maxFeePerGas: FeeValuesEIP1559["maxFeePerGas"];
        } | {
        maxPriorityFeePerGas: FeeValuesEIP1559["maxPriorityFeePerGas"];
        }, FeeValuesEIP1559> & {
        accessList?: TransactionSerializableEIP2930["accessList"] | undefined;
        }) ? "eip1559" : never) | (request extends {
        accessList?: AccessList;
        authorizationList?: undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: bigint;
        sidecars?: undefined;
        maxFeePerBlobGas?: undefined;
        maxFeePerGas?: undefined;
        maxPriorityFeePerGas?: undefined;
        } & {
        accessList: TransactionSerializableEIP2930["accessList"];
        } ? "eip2930" : never) | (request extends ({
        accessList?: AccessList;
        authorizationList?: undefined;
        blobs?: readonly `0x${string}`[] | readonly ByteArray[];
        blobVersionedHashes?: readonly `0x${string}`[];
        maxFeePerBlobGas?: bigint;
        maxFeePerGas?: bigint;
        maxPriorityFeePerGas?: bigint;
        sidecars?: false | readonly BlobSidecar<`0x${string}`>[];
        } | {
        accessList?: AccessList;
        authorizationList?: undefined;
        blobs?: readonly `0x${string}`[] | readonly ByteArray[];
        blobVersionedHashes?: readonly `0x${string}`[];
        maxFeePerBlobGas?: bigint;
        maxFeePerGas?: bigint;
        maxPriorityFeePerGas?: bigint;
        sidecars?: false | readonly BlobSidecar<`0x${string}`>[];
        }) & (ExactPartial<FeeValuesEIP4844> & OneOf<    {
        blobs: TransactionSerializableEIP4844["blobs"];
        } | {
        blobVersionedHashes: TransactionSerializableEIP4844["blobVersionedHashes"];
        } | {
        sidecars: TransactionSerializableEIP4844["sidecars"];
        }, TransactionSerializableEIP4844>) ? "eip4844" : never) | (request extends ({
        accessList?: AccessList;
        authorizationList?: SignedAuthorizationList;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: undefined;
        maxFeePerBlobGas?: undefined;
        maxFeePerGas?: bigint;
        maxPriorityFeePerGas?: bigint;
        sidecars?: undefined;
        } | {
        accessList?: AccessList;
        authorizationList?: SignedAuthorizationList;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: undefined;
        maxFeePerBlobGas?: undefined;
        maxFeePerGas?: bigint;
        maxPriorityFeePerGas?: bigint;
        sidecars?: undefined;
        }) & {
        authorizationList: TransactionSerializableEIP7702["authorizationList"];
        } ? "eip7702" : never) | (request["type"] extends string ? Extract<request["type"], string> : never)>) ? T_3 extends "legacy" ? TransactionRequestLegacy : never : never : never) | ((request["type"] extends string ? request["type"] : GetTransactionType<request, (request extends {
        accessList?: undefined;
        authorizationList?: undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: bigint;
        sidecars?: undefined;
        } & FeeValuesLegacy ? "legacy" : never) | (request extends {
        accessList?: AccessList;
        authorizationList?: undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: undefined;
        maxFeePerBlobGas?: undefined;
        maxFeePerGas?: bigint;
        maxPriorityFeePerGas?: bigint;
        sidecars?: undefined;
        } & (OneOf<    {
        maxFeePerGas: FeeValuesEIP1559["maxFeePerGas"];
        } | {
        maxPriorityFeePerGas: FeeValuesEIP1559["maxPriorityFeePerGas"];
        }, FeeValuesEIP1559> & {
        accessList?: TransactionSerializableEIP2930["accessList"] | undefined;
        }) ? "eip1559" : never) | (request extends {
        accessList?: AccessList;
        authorizationList?: undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: bigint;
        sidecars?: undefined;
        maxFeePerBlobGas?: undefined;
        maxFeePerGas?: undefined;
        maxPriorityFeePerGas?: undefined;
        } & {
        accessList: TransactionSerializableEIP2930["accessList"];
        } ? "eip2930" : never) | (request extends ({
        accessList?: AccessList;
        authorizationList?: undefined;
        blobs?: readonly `0x${string}`[] | readonly ByteArray[];
        blobVersionedHashes?: readonly `0x${string}`[];
        maxFeePerBlobGas?: bigint;
        maxFeePerGas?: bigint;
        maxPriorityFeePerGas?: bigint;
        sidecars?: false | readonly BlobSidecar<`0x${string}`>[];
        } | {
        accessList?: AccessList;
        authorizationList?: undefined;
        blobs?: readonly `0x${string}`[] | readonly ByteArray[];
        blobVersionedHashes?: readonly `0x${string}`[];
        maxFeePerBlobGas?: bigint;
        maxFeePerGas?: bigint;
        maxPriorityFeePerGas?: bigint;
        sidecars?: false | readonly BlobSidecar<`0x${string}`>[];
        }) & (ExactPartial<FeeValuesEIP4844> & OneOf<    {
        blobs: TransactionSerializableEIP4844["blobs"];
        } | {
        blobVersionedHashes: TransactionSerializableEIP4844["blobVersionedHashes"];
        } | {
        sidecars: TransactionSerializableEIP4844["sidecars"];
        }, TransactionSerializableEIP4844>) ? "eip4844" : never) | (request extends ({
        accessList?: AccessList;
        authorizationList?: SignedAuthorizationList;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: undefined;
        maxFeePerBlobGas?: undefined;
        maxFeePerGas?: bigint;
        maxPriorityFeePerGas?: bigint;
        sidecars?: undefined;
        } | {
        accessList?: AccessList;
        authorizationList?: SignedAuthorizationList;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: undefined;
        maxFeePerBlobGas?: undefined;
        maxFeePerGas?: bigint;
        maxPriorityFeePerGas?: bigint;
        sidecars?: undefined;
        }) & {
        authorizationList: TransactionSerializableEIP7702["authorizationList"];
        } ? "eip7702" : never) | (request["type"] extends string ? Extract<request["type"], string> : never)> extends "legacy" ? unknown : GetTransactionType<request, (request extends {
        accessList?: undefined;
        authorizationList?: undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: bigint;
        sidecars?: undefined;
        } & FeeValuesLegacy ? "legacy" : never) | (request extends {
        accessList?: AccessList;
        authorizationList?: undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: undefined;
        maxFeePerBlobGas?: undefined;
        maxFeePerGas?: bigint;
        maxPriorityFeePerGas?: bigint;
        sidecars?: undefined;
        } & (OneOf<    {
        maxFeePerGas: FeeValuesEIP1559["maxFeePerGas"];
        } | {
        maxPriorityFeePerGas: FeeValuesEIP1559["maxPriorityFeePerGas"];
        }, FeeValuesEIP1559> & {
        accessList?: TransactionSerializableEIP2930["accessList"] | undefined;
        }) ? "eip1559" : never) | (request extends {
        accessList?: AccessList;
        authorizationList?: undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: bigint;
        sidecars?: undefined;
        maxFeePerBlobGas?: undefined;
        maxFeePerGas?: undefined;
        maxPriorityFeePerGas?: undefined;
        } & {
        accessList: TransactionSerializableEIP2930["accessList"];
        } ? "eip2930" : never) | (request extends ({
        accessList?: AccessList;
        authorizationList?: undefined;
        blobs?: readonly `0x${string}`[] | readonly ByteArray[];
        blobVersionedHashes?: readonly `0x${string}`[];
        maxFeePerBlobGas?: bigint;
        maxFeePerGas?: bigint;
        maxPriorityFeePerGas?: bigint;
        sidecars?: false | readonly BlobSidecar<`0x${string}`>[];
        } | {
        accessList?: AccessList;
        authorizationList?: undefined;
        blobs?: readonly `0x${string}`[] | readonly ByteArray[];
        blobVersionedHashes?: readonly `0x${string}`[];
        maxFeePerBlobGas?: bigint;
        maxFeePerGas?: bigint;
        maxPriorityFeePerGas?: bigint;
        sidecars?: false | readonly BlobSidecar<`0x${string}`>[];
        }) & (ExactPartial<FeeValuesEIP4844> & OneOf<    {
        blobs: TransactionSerializableEIP4844["blobs"];
        } | {
        blobVersionedHashes: TransactionSerializableEIP4844["blobVersionedHashes"];
        } | {
        sidecars: TransactionSerializableEIP4844["sidecars"];
        }, TransactionSerializableEIP4844>) ? "eip4844" : never) | (request extends ({
        accessList?: AccessList;
        authorizationList?: SignedAuthorizationList;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: undefined;
        maxFeePerBlobGas?: undefined;
        maxFeePerGas?: bigint;
        maxPriorityFeePerGas?: bigint;
        sidecars?: undefined;
        } | {
        accessList?: AccessList;
        authorizationList?: SignedAuthorizationList;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: undefined;
        maxFeePerBlobGas?: undefined;
        maxFeePerGas?: bigint;
        maxPriorityFeePerGas?: bigint;
        sidecars?: undefined;
        }) & {
        authorizationList: TransactionSerializableEIP7702["authorizationList"];
        } ? "eip7702" : never) | (request["type"] extends string ? Extract<request["type"], string> : never)>) extends infer T_4 ? T_4 extends (request["type"] extends string ? request["type"] : GetTransactionType<request, (request extends {
        accessList?: undefined;
        authorizationList?: undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: bigint;
        sidecars?: undefined;
        } & FeeValuesLegacy ? "legacy" : never) | (request extends {
        accessList?: AccessList;
        authorizationList?: undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: undefined;
        maxFeePerBlobGas?: undefined;
        maxFeePerGas?: bigint;
        maxPriorityFeePerGas?: bigint;
        sidecars?: undefined;
        } & (OneOf<    {
        maxFeePerGas: FeeValuesEIP1559["maxFeePerGas"];
        } | {
        maxPriorityFeePerGas: FeeValuesEIP1559["maxPriorityFeePerGas"];
        }, FeeValuesEIP1559> & {
        accessList?: TransactionSerializableEIP2930["accessList"] | undefined;
        }) ? "eip1559" : never) | (request extends {
        accessList?: AccessList;
        authorizationList?: undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: bigint;
        sidecars?: undefined;
        maxFeePerBlobGas?: undefined;
        maxFeePerGas?: undefined;
        maxPriorityFeePerGas?: undefined;
        } & {
        accessList: TransactionSerializableEIP2930["accessList"];
        } ? "eip2930" : never) | (request extends ({
        accessList?: AccessList;
        authorizationList?: undefined;
        blobs?: readonly `0x${string}`[] | readonly ByteArray[];
        blobVersionedHashes?: readonly `0x${string}`[];
        maxFeePerBlobGas?: bigint;
        maxFeePerGas?: bigint;
        maxPriorityFeePerGas?: bigint;
        sidecars?: false | readonly BlobSidecar<`0x${string}`>[];
        } | {
        accessList?: AccessList;
        authorizationList?: undefined;
        blobs?: readonly `0x${string}`[] | readonly ByteArray[];
        blobVersionedHashes?: readonly `0x${string}`[];
        maxFeePerBlobGas?: bigint;
        maxFeePerGas?: bigint;
        maxPriorityFeePerGas?: bigint;
        sidecars?: false | readonly BlobSidecar<`0x${string}`>[];
        }) & (ExactPartial<FeeValuesEIP4844> & OneOf<    {
        blobs: TransactionSerializableEIP4844["blobs"];
        } | {
        blobVersionedHashes: TransactionSerializableEIP4844["blobVersionedHashes"];
        } | {
        sidecars: TransactionSerializableEIP4844["sidecars"];
        }, TransactionSerializableEIP4844>) ? "eip4844" : never) | (request extends ({
        accessList?: AccessList;
        authorizationList?: SignedAuthorizationList;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: undefined;
        maxFeePerBlobGas?: undefined;
        maxFeePerGas?: bigint;
        maxPriorityFeePerGas?: bigint;
        sidecars?: undefined;
        } | {
        accessList?: AccessList;
        authorizationList?: SignedAuthorizationList;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: undefined;
        maxFeePerBlobGas?: undefined;
        maxFeePerGas?: bigint;
        maxPriorityFeePerGas?: bigint;
        sidecars?: undefined;
        }) & {
        authorizationList: TransactionSerializableEIP7702["authorizationList"];
        } ? "eip7702" : never) | (request["type"] extends string ? Extract<request["type"], string> : never)> extends "legacy" ? unknown : GetTransactionType<request, (request extends {
        accessList?: undefined;
        authorizationList?: undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: bigint;
        sidecars?: undefined;
        } & FeeValuesLegacy ? "legacy" : never) | (request extends {
        accessList?: AccessList;
        authorizationList?: undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: undefined;
        maxFeePerBlobGas?: undefined;
        maxFeePerGas?: bigint;
        maxPriorityFeePerGas?: bigint;
        sidecars?: undefined;
        } & (OneOf<    {
        maxFeePerGas: FeeValuesEIP1559["maxFeePerGas"];
        } | {
        maxPriorityFeePerGas: FeeValuesEIP1559["maxPriorityFeePerGas"];
        }, FeeValuesEIP1559> & {
        accessList?: TransactionSerializableEIP2930["accessList"] | undefined;
        }) ? "eip1559" : never) | (request extends {
        accessList?: AccessList;
        authorizationList?: undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: bigint;
        sidecars?: undefined;
        maxFeePerBlobGas?: undefined;
        maxFeePerGas?: undefined;
        maxPriorityFeePerGas?: undefined;
        } & {
        accessList: TransactionSerializableEIP2930["accessList"];
        } ? "eip2930" : never) | (request extends ({
        accessList?: AccessList;
        authorizationList?: undefined;
        blobs?: readonly `0x${string}`[] | readonly ByteArray[];
        blobVersionedHashes?: readonly `0x${string}`[];
        maxFeePerBlobGas?: bigint;
        maxFeePerGas?: bigint;
        maxPriorityFeePerGas?: bigint;
        sidecars?: false | readonly BlobSidecar<`0x${string}`>[];
        } | {
        accessList?: AccessList;
        authorizationList?: undefined;
        blobs?: readonly `0x${string}`[] | readonly ByteArray[];
        blobVersionedHashes?: readonly `0x${string}`[];
        maxFeePerBlobGas?: bigint;
        maxFeePerGas?: bigint;
        maxPriorityFeePerGas?: bigint;
        sidecars?: false | readonly BlobSidecar<`0x${string}`>[];
        }) & (ExactPartial<FeeValuesEIP4844> & OneOf<    {
        blobs: TransactionSerializableEIP4844["blobs"];
        } | {
        blobVersionedHashes: TransactionSerializableEIP4844["blobVersionedHashes"];
        } | {
        sidecars: TransactionSerializableEIP4844["sidecars"];
        }, TransactionSerializableEIP4844>) ? "eip4844" : never) | (request extends ({
        accessList?: AccessList;
        authorizationList?: SignedAuthorizationList;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: undefined;
        maxFeePerBlobGas?: undefined;
        maxFeePerGas?: bigint;
        maxPriorityFeePerGas?: bigint;
        sidecars?: undefined;
        } | {
        accessList?: AccessList;
        authorizationList?: SignedAuthorizationList;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: undefined;
        maxFeePerBlobGas?: undefined;
        maxFeePerGas?: bigint;
        maxPriorityFeePerGas?: bigint;
        sidecars?: undefined;
        }) & {
        authorizationList: TransactionSerializableEIP7702["authorizationList"];
        } ? "eip7702" : never) | (request["type"] extends string ? Extract<request["type"], string> : never)>) ? T_4 extends "eip1559" ? TransactionRequestEIP1559 : never : never : never) | ((request["type"] extends string ? request["type"] : GetTransactionType<request, (request extends {
        accessList?: undefined;
        authorizationList?: undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: bigint;
        sidecars?: undefined;
        } & FeeValuesLegacy ? "legacy" : never) | (request extends {
        accessList?: AccessList;
        authorizationList?: undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: undefined;
        maxFeePerBlobGas?: undefined;
        maxFeePerGas?: bigint;
        maxPriorityFeePerGas?: bigint;
        sidecars?: undefined;
        } & (OneOf<    {
        maxFeePerGas: FeeValuesEIP1559["maxFeePerGas"];
        } | {
        maxPriorityFeePerGas: FeeValuesEIP1559["maxPriorityFeePerGas"];
        }, FeeValuesEIP1559> & {
        accessList?: TransactionSerializableEIP2930["accessList"] | undefined;
        }) ? "eip1559" : never) | (request extends {
        accessList?: AccessList;
        authorizationList?: undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: bigint;
        sidecars?: undefined;
        maxFeePerBlobGas?: undefined;
        maxFeePerGas?: undefined;
        maxPriorityFeePerGas?: undefined;
        } & {
        accessList: TransactionSerializableEIP2930["accessList"];
        } ? "eip2930" : never) | (request extends ({
        accessList?: AccessList;
        authorizationList?: undefined;
        blobs?: readonly `0x${string}`[] | readonly ByteArray[];
        blobVersionedHashes?: readonly `0x${string}`[];
        maxFeePerBlobGas?: bigint;
        maxFeePerGas?: bigint;
        maxPriorityFeePerGas?: bigint;
        sidecars?: false | readonly BlobSidecar<`0x${string}`>[];
        } | {
        accessList?: AccessList;
        authorizationList?: undefined;
        blobs?: readonly `0x${string}`[] | readonly ByteArray[];
        blobVersionedHashes?: readonly `0x${string}`[];
        maxFeePerBlobGas?: bigint;
        maxFeePerGas?: bigint;
        maxPriorityFeePerGas?: bigint;
        sidecars?: false | readonly BlobSidecar<`0x${string}`>[];
        }) & (ExactPartial<FeeValuesEIP4844> & OneOf<    {
        blobs: TransactionSerializableEIP4844["blobs"];
        } | {
        blobVersionedHashes: TransactionSerializableEIP4844["blobVersionedHashes"];
        } | {
        sidecars: TransactionSerializableEIP4844["sidecars"];
        }, TransactionSerializableEIP4844>) ? "eip4844" : never) | (request extends ({
        accessList?: AccessList;
        authorizationList?: SignedAuthorizationList;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: undefined;
        maxFeePerBlobGas?: undefined;
        maxFeePerGas?: bigint;
        maxPriorityFeePerGas?: bigint;
        sidecars?: undefined;
        } | {
        accessList?: AccessList;
        authorizationList?: SignedAuthorizationList;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: undefined;
        maxFeePerBlobGas?: undefined;
        maxFeePerGas?: bigint;
        maxPriorityFeePerGas?: bigint;
        sidecars?: undefined;
        }) & {
        authorizationList: TransactionSerializableEIP7702["authorizationList"];
        } ? "eip7702" : never) | (request["type"] extends string ? Extract<request["type"], string> : never)> extends "legacy" ? unknown : GetTransactionType<request, (request extends {
        accessList?: undefined;
        authorizationList?: undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: bigint;
        sidecars?: undefined;
        } & FeeValuesLegacy ? "legacy" : never) | (request extends {
        accessList?: AccessList;
        authorizationList?: undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: undefined;
        maxFeePerBlobGas?: undefined;
        maxFeePerGas?: bigint;
        maxPriorityFeePerGas?: bigint;
        sidecars?: undefined;
        } & (OneOf<    {
        maxFeePerGas: FeeValuesEIP1559["maxFeePerGas"];
        } | {
        maxPriorityFeePerGas: FeeValuesEIP1559["maxPriorityFeePerGas"];
        }, FeeValuesEIP1559> & {
        accessList?: TransactionSerializableEIP2930["accessList"] | undefined;
        }) ? "eip1559" : never) | (request extends {
        accessList?: AccessList;
        authorizationList?: undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: bigint;
        sidecars?: undefined;
        maxFeePerBlobGas?: undefined;
        maxFeePerGas?: undefined;
        maxPriorityFeePerGas?: undefined;
        } & {
        accessList: TransactionSerializableEIP2930["accessList"];
        } ? "eip2930" : never) | (request extends ({
        accessList?: AccessList;
        authorizationList?: undefined;
        blobs?: readonly `0x${string}`[] | readonly ByteArray[];
        blobVersionedHashes?: readonly `0x${string}`[];
        maxFeePerBlobGas?: bigint;
        maxFeePerGas?: bigint;
        maxPriorityFeePerGas?: bigint;
        sidecars?: false | readonly BlobSidecar<`0x${string}`>[];
        } | {
        accessList?: AccessList;
        authorizationList?: undefined;
        blobs?: readonly `0x${string}`[] | readonly ByteArray[];
        blobVersionedHashes?: readonly `0x${string}`[];
        maxFeePerBlobGas?: bigint;
        maxFeePerGas?: bigint;
        maxPriorityFeePerGas?: bigint;
        sidecars?: false | readonly BlobSidecar<`0x${string}`>[];
        }) & (ExactPartial<FeeValuesEIP4844> & OneOf<    {
        blobs: TransactionSerializableEIP4844["blobs"];
        } | {
        blobVersionedHashes: TransactionSerializableEIP4844["blobVersionedHashes"];
        } | {
        sidecars: TransactionSerializableEIP4844["sidecars"];
        }, TransactionSerializableEIP4844>) ? "eip4844" : never) | (request extends ({
        accessList?: AccessList;
        authorizationList?: SignedAuthorizationList;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: undefined;
        maxFeePerBlobGas?: undefined;
        maxFeePerGas?: bigint;
        maxPriorityFeePerGas?: bigint;
        sidecars?: undefined;
        } | {
        accessList?: AccessList;
        authorizationList?: SignedAuthorizationList;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: undefined;
        maxFeePerBlobGas?: undefined;
        maxFeePerGas?: bigint;
        maxPriorityFeePerGas?: bigint;
        sidecars?: undefined;
        }) & {
        authorizationList: TransactionSerializableEIP7702["authorizationList"];
        } ? "eip7702" : never) | (request["type"] extends string ? Extract<request["type"], string> : never)>) extends infer T_5 ? T_5 extends (request["type"] extends string ? request["type"] : GetTransactionType<request, (request extends {
        accessList?: undefined;
        authorizationList?: undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: bigint;
        sidecars?: undefined;
        } & FeeValuesLegacy ? "legacy" : never) | (request extends {
        accessList?: AccessList;
        authorizationList?: undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: undefined;
        maxFeePerBlobGas?: undefined;
        maxFeePerGas?: bigint;
        maxPriorityFeePerGas?: bigint;
        sidecars?: undefined;
        } & (OneOf<    {
        maxFeePerGas: FeeValuesEIP1559["maxFeePerGas"];
        } | {
        maxPriorityFeePerGas: FeeValuesEIP1559["maxPriorityFeePerGas"];
        }, FeeValuesEIP1559> & {
        accessList?: TransactionSerializableEIP2930["accessList"] | undefined;
        }) ? "eip1559" : never) | (request extends {
        accessList?: AccessList;
        authorizationList?: undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: bigint;
        sidecars?: undefined;
        maxFeePerBlobGas?: undefined;
        maxFeePerGas?: undefined;
        maxPriorityFeePerGas?: undefined;
        } & {
        accessList: TransactionSerializableEIP2930["accessList"];
        } ? "eip2930" : never) | (request extends ({
        accessList?: AccessList;
        authorizationList?: undefined;
        blobs?: readonly `0x${string}`[] | readonly ByteArray[];
        blobVersionedHashes?: readonly `0x${string}`[];
        maxFeePerBlobGas?: bigint;
        maxFeePerGas?: bigint;
        maxPriorityFeePerGas?: bigint;
        sidecars?: false | readonly BlobSidecar<`0x${string}`>[];
        } | {
        accessList?: AccessList;
        authorizationList?: undefined;
        blobs?: readonly `0x${string}`[] | readonly ByteArray[];
        blobVersionedHashes?: readonly `0x${string}`[];
        maxFeePerBlobGas?: bigint;
        maxFeePerGas?: bigint;
        maxPriorityFeePerGas?: bigint;
        sidecars?: false | readonly BlobSidecar<`0x${string}`>[];
        }) & (ExactPartial<FeeValuesEIP4844> & OneOf<    {
        blobs: TransactionSerializableEIP4844["blobs"];
        } | {
        blobVersionedHashes: TransactionSerializableEIP4844["blobVersionedHashes"];
        } | {
        sidecars: TransactionSerializableEIP4844["sidecars"];
        }, TransactionSerializableEIP4844>) ? "eip4844" : never) | (request extends ({
        accessList?: AccessList;
        authorizationList?: SignedAuthorizationList;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: undefined;
        maxFeePerBlobGas?: undefined;
        maxFeePerGas?: bigint;
        maxPriorityFeePerGas?: bigint;
        sidecars?: undefined;
        } | {
        accessList?: AccessList;
        authorizationList?: SignedAuthorizationList;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: undefined;
        maxFeePerBlobGas?: undefined;
        maxFeePerGas?: bigint;
        maxPriorityFeePerGas?: bigint;
        sidecars?: undefined;
        }) & {
        authorizationList: TransactionSerializableEIP7702["authorizationList"];
        } ? "eip7702" : never) | (request["type"] extends string ? Extract<request["type"], string> : never)> extends "legacy" ? unknown : GetTransactionType<request, (request extends {
        accessList?: undefined;
        authorizationList?: undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: bigint;
        sidecars?: undefined;
        } & FeeValuesLegacy ? "legacy" : never) | (request extends {
        accessList?: AccessList;
        authorizationList?: undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: undefined;
        maxFeePerBlobGas?: undefined;
        maxFeePerGas?: bigint;
        maxPriorityFeePerGas?: bigint;
        sidecars?: undefined;
        } & (OneOf<    {
        maxFeePerGas: FeeValuesEIP1559["maxFeePerGas"];
        } | {
        maxPriorityFeePerGas: FeeValuesEIP1559["maxPriorityFeePerGas"];
        }, FeeValuesEIP1559> & {
        accessList?: TransactionSerializableEIP2930["accessList"] | undefined;
        }) ? "eip1559" : never) | (request extends {
        accessList?: AccessList;
        authorizationList?: undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: bigint;
        sidecars?: undefined;
        maxFeePerBlobGas?: undefined;
        maxFeePerGas?: undefined;
        maxPriorityFeePerGas?: undefined;
        } & {
        accessList: TransactionSerializableEIP2930["accessList"];
        } ? "eip2930" : never) | (request extends ({
        accessList?: AccessList;
        authorizationList?: undefined;
        blobs?: readonly `0x${string}`[] | readonly ByteArray[];
        blobVersionedHashes?: readonly `0x${string}`[];
        maxFeePerBlobGas?: bigint;
        maxFeePerGas?: bigint;
        maxPriorityFeePerGas?: bigint;
        sidecars?: false | readonly BlobSidecar<`0x${string}`>[];
        } | {
        accessList?: AccessList;
        authorizationList?: undefined;
        blobs?: readonly `0x${string}`[] | readonly ByteArray[];
        blobVersionedHashes?: readonly `0x${string}`[];
        maxFeePerBlobGas?: bigint;
        maxFeePerGas?: bigint;
        maxPriorityFeePerGas?: bigint;
        sidecars?: false | readonly BlobSidecar<`0x${string}`>[];
        }) & (ExactPartial<FeeValuesEIP4844> & OneOf<    {
        blobs: TransactionSerializableEIP4844["blobs"];
        } | {
        blobVersionedHashes: TransactionSerializableEIP4844["blobVersionedHashes"];
        } | {
        sidecars: TransactionSerializableEIP4844["sidecars"];
        }, TransactionSerializableEIP4844>) ? "eip4844" : never) | (request extends ({
        accessList?: AccessList;
        authorizationList?: SignedAuthorizationList;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: undefined;
        maxFeePerBlobGas?: undefined;
        maxFeePerGas?: bigint;
        maxPriorityFeePerGas?: bigint;
        sidecars?: undefined;
        } | {
        accessList?: AccessList;
        authorizationList?: SignedAuthorizationList;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: undefined;
        maxFeePerBlobGas?: undefined;
        maxFeePerGas?: bigint;
        maxPriorityFeePerGas?: bigint;
        sidecars?: undefined;
        }) & {
        authorizationList: TransactionSerializableEIP7702["authorizationList"];
        } ? "eip7702" : never) | (request["type"] extends string ? Extract<request["type"], string> : never)>) ? T_5 extends "eip2930" ? TransactionRequestEIP2930 : never : never : never) | ((request["type"] extends string ? request["type"] : GetTransactionType<request, (request extends {
        accessList?: undefined;
        authorizationList?: undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: bigint;
        sidecars?: undefined;
        } & FeeValuesLegacy ? "legacy" : never) | (request extends {
        accessList?: AccessList;
        authorizationList?: undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: undefined;
        maxFeePerBlobGas?: undefined;
        maxFeePerGas?: bigint;
        maxPriorityFeePerGas?: bigint;
        sidecars?: undefined;
        } & (OneOf<    {
        maxFeePerGas: FeeValuesEIP1559["maxFeePerGas"];
        } | {
        maxPriorityFeePerGas: FeeValuesEIP1559["maxPriorityFeePerGas"];
        }, FeeValuesEIP1559> & {
        accessList?: TransactionSerializableEIP2930["accessList"] | undefined;
        }) ? "eip1559" : never) | (request extends {
        accessList?: AccessList;
        authorizationList?: undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: bigint;
        sidecars?: undefined;
        maxFeePerBlobGas?: undefined;
        maxFeePerGas?: undefined;
        maxPriorityFeePerGas?: undefined;
        } & {
        accessList: TransactionSerializableEIP2930["accessList"];
        } ? "eip2930" : never) | (request extends ({
        accessList?: AccessList;
        authorizationList?: undefined;
        blobs?: readonly `0x${string}`[] | readonly ByteArray[];
        blobVersionedHashes?: readonly `0x${string}`[];
        maxFeePerBlobGas?: bigint;
        maxFeePerGas?: bigint;
        maxPriorityFeePerGas?: bigint;
        sidecars?: false | readonly BlobSidecar<`0x${string}`>[];
        } | {
        accessList?: AccessList;
        authorizationList?: undefined;
        blobs?: readonly `0x${string}`[] | readonly ByteArray[];
        blobVersionedHashes?: readonly `0x${string}`[];
        maxFeePerBlobGas?: bigint;
        maxFeePerGas?: bigint;
        maxPriorityFeePerGas?: bigint;
        sidecars?: false | readonly BlobSidecar<`0x${string}`>[];
        }) & (ExactPartial<FeeValuesEIP4844> & OneOf<    {
        blobs: TransactionSerializableEIP4844["blobs"];
        } | {
        blobVersionedHashes: TransactionSerializableEIP4844["blobVersionedHashes"];
        } | {
        sidecars: TransactionSerializableEIP4844["sidecars"];
        }, TransactionSerializableEIP4844>) ? "eip4844" : never) | (request extends ({
        accessList?: AccessList;
        authorizationList?: SignedAuthorizationList;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: undefined;
        maxFeePerBlobGas?: undefined;
        maxFeePerGas?: bigint;
        maxPriorityFeePerGas?: bigint;
        sidecars?: undefined;
        } | {
        accessList?: AccessList;
        authorizationList?: SignedAuthorizationList;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: undefined;
        maxFeePerBlobGas?: undefined;
        maxFeePerGas?: bigint;
        maxPriorityFeePerGas?: bigint;
        sidecars?: undefined;
        }) & {
        authorizationList: TransactionSerializableEIP7702["authorizationList"];
        } ? "eip7702" : never) | (request["type"] extends string ? Extract<request["type"], string> : never)> extends "legacy" ? unknown : GetTransactionType<request, (request extends {
        accessList?: undefined;
        authorizationList?: undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: bigint;
        sidecars?: undefined;
        } & FeeValuesLegacy ? "legacy" : never) | (request extends {
        accessList?: AccessList;
        authorizationList?: undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: undefined;
        maxFeePerBlobGas?: undefined;
        maxFeePerGas?: bigint;
        maxPriorityFeePerGas?: bigint;
        sidecars?: undefined;
        } & (OneOf<    {
        maxFeePerGas: FeeValuesEIP1559["maxFeePerGas"];
        } | {
        maxPriorityFeePerGas: FeeValuesEIP1559["maxPriorityFeePerGas"];
        }, FeeValuesEIP1559> & {
        accessList?: TransactionSerializableEIP2930["accessList"] | undefined;
        }) ? "eip1559" : never) | (request extends {
        accessList?: AccessList;
        authorizationList?: undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: bigint;
        sidecars?: undefined;
        maxFeePerBlobGas?: undefined;
        maxFeePerGas?: undefined;
        maxPriorityFeePerGas?: undefined;
        } & {
        accessList: TransactionSerializableEIP2930["accessList"];
        } ? "eip2930" : never) | (request extends ({
        accessList?: AccessList;
        authorizationList?: undefined;
        blobs?: readonly `0x${string}`[] | readonly ByteArray[];
        blobVersionedHashes?: readonly `0x${string}`[];
        maxFeePerBlobGas?: bigint;
        maxFeePerGas?: bigint;
        maxPriorityFeePerGas?: bigint;
        sidecars?: false | readonly BlobSidecar<`0x${string}`>[];
        } | {
        accessList?: AccessList;
        authorizationList?: undefined;
        blobs?: readonly `0x${string}`[] | readonly ByteArray[];
        blobVersionedHashes?: readonly `0x${string}`[];
        maxFeePerBlobGas?: bigint;
        maxFeePerGas?: bigint;
        maxPriorityFeePerGas?: bigint;
        sidecars?: false | readonly BlobSidecar<`0x${string}`>[];
        }) & (ExactPartial<FeeValuesEIP4844> & OneOf<    {
        blobs: TransactionSerializableEIP4844["blobs"];
        } | {
        blobVersionedHashes: TransactionSerializableEIP4844["blobVersionedHashes"];
        } | {
        sidecars: TransactionSerializableEIP4844["sidecars"];
        }, TransactionSerializableEIP4844>) ? "eip4844" : never) | (request extends ({
        accessList?: AccessList;
        authorizationList?: SignedAuthorizationList;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: undefined;
        maxFeePerBlobGas?: undefined;
        maxFeePerGas?: bigint;
        maxPriorityFeePerGas?: bigint;
        sidecars?: undefined;
        } | {
        accessList?: AccessList;
        authorizationList?: SignedAuthorizationList;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: undefined;
        maxFeePerBlobGas?: undefined;
        maxFeePerGas?: bigint;
        maxPriorityFeePerGas?: bigint;
        sidecars?: undefined;
        }) & {
        authorizationList: TransactionSerializableEIP7702["authorizationList"];
        } ? "eip7702" : never) | (request["type"] extends string ? Extract<request["type"], string> : never)>) extends infer T_6 ? T_6 extends (request["type"] extends string ? request["type"] : GetTransactionType<request, (request extends {
        accessList?: undefined;
        authorizationList?: undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: bigint;
        sidecars?: undefined;
        } & FeeValuesLegacy ? "legacy" : never) | (request extends {
        accessList?: AccessList;
        authorizationList?: undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: undefined;
        maxFeePerBlobGas?: undefined;
        maxFeePerGas?: bigint;
        maxPriorityFeePerGas?: bigint;
        sidecars?: undefined;
        } & (OneOf<    {
        maxFeePerGas: FeeValuesEIP1559["maxFeePerGas"];
        } | {
        maxPriorityFeePerGas: FeeValuesEIP1559["maxPriorityFeePerGas"];
        }, FeeValuesEIP1559> & {
        accessList?: TransactionSerializableEIP2930["accessList"] | undefined;
        }) ? "eip1559" : never) | (request extends {
        accessList?: AccessList;
        authorizationList?: undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: bigint;
        sidecars?: undefined;
        maxFeePerBlobGas?: undefined;
        maxFeePerGas?: undefined;
        maxPriorityFeePerGas?: undefined;
        } & {
        accessList: TransactionSerializableEIP2930["accessList"];
        } ? "eip2930" : never) | (request extends ({
        accessList?: AccessList;
        authorizationList?: undefined;
        blobs?: readonly `0x${string}`[] | readonly ByteArray[];
        blobVersionedHashes?: readonly `0x${string}`[];
        maxFeePerBlobGas?: bigint;
        maxFeePerGas?: bigint;
        maxPriorityFeePerGas?: bigint;
        sidecars?: false | readonly BlobSidecar<`0x${string}`>[];
        } | {
        accessList?: AccessList;
        authorizationList?: undefined;
        blobs?: readonly `0x${string}`[] | readonly ByteArray[];
        blobVersionedHashes?: readonly `0x${string}`[];
        maxFeePerBlobGas?: bigint;
        maxFeePerGas?: bigint;
        maxPriorityFeePerGas?: bigint;
        sidecars?: false | readonly BlobSidecar<`0x${string}`>[];
        }) & (ExactPartial<FeeValuesEIP4844> & OneOf<    {
        blobs: TransactionSerializableEIP4844["blobs"];
        } | {
        blobVersionedHashes: TransactionSerializableEIP4844["blobVersionedHashes"];
        } | {
        sidecars: TransactionSerializableEIP4844["sidecars"];
        }, TransactionSerializableEIP4844>) ? "eip4844" : never) | (request extends ({
        accessList?: AccessList;
        authorizationList?: SignedAuthorizationList;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: undefined;
        maxFeePerBlobGas?: undefined;
        maxFeePerGas?: bigint;
        maxPriorityFeePerGas?: bigint;
        sidecars?: undefined;
        } | {
        accessList?: AccessList;
        authorizationList?: SignedAuthorizationList;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: undefined;
        maxFeePerBlobGas?: undefined;
        maxFeePerGas?: bigint;
        maxPriorityFeePerGas?: bigint;
        sidecars?: undefined;
        }) & {
        authorizationList: TransactionSerializableEIP7702["authorizationList"];
        } ? "eip7702" : never) | (request["type"] extends string ? Extract<request["type"], string> : never)> extends "legacy" ? unknown : GetTransactionType<request, (request extends {
        accessList?: undefined;
        authorizationList?: undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: bigint;
        sidecars?: undefined;
        } & FeeValuesLegacy ? "legacy" : never) | (request extends {
        accessList?: AccessList;
        authorizationList?: undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: undefined;
        maxFeePerBlobGas?: undefined;
        maxFeePerGas?: bigint;
        maxPriorityFeePerGas?: bigint;
        sidecars?: undefined;
        } & (OneOf<    {
        maxFeePerGas: FeeValuesEIP1559["maxFeePerGas"];
        } | {
        maxPriorityFeePerGas: FeeValuesEIP1559["maxPriorityFeePerGas"];
        }, FeeValuesEIP1559> & {
        accessList?: TransactionSerializableEIP2930["accessList"] | undefined;
        }) ? "eip1559" : never) | (request extends {
        accessList?: AccessList;
        authorizationList?: undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: bigint;
        sidecars?: undefined;
        maxFeePerBlobGas?: undefined;
        maxFeePerGas?: undefined;
        maxPriorityFeePerGas?: undefined;
        } & {
        accessList: TransactionSerializableEIP2930["accessList"];
        } ? "eip2930" : never) | (request extends ({
        accessList?: AccessList;
        authorizationList?: undefined;
        blobs?: readonly `0x${string}`[] | readonly ByteArray[];
        blobVersionedHashes?: readonly `0x${string}`[];
        maxFeePerBlobGas?: bigint;
        maxFeePerGas?: bigint;
        maxPriorityFeePerGas?: bigint;
        sidecars?: false | readonly BlobSidecar<`0x${string}`>[];
        } | {
        accessList?: AccessList;
        authorizationList?: undefined;
        blobs?: readonly `0x${string}`[] | readonly ByteArray[];
        blobVersionedHashes?: readonly `0x${string}`[];
        maxFeePerBlobGas?: bigint;
        maxFeePerGas?: bigint;
        maxPriorityFeePerGas?: bigint;
        sidecars?: false | readonly BlobSidecar<`0x${string}`>[];
        }) & (ExactPartial<FeeValuesEIP4844> & OneOf<    {
        blobs: TransactionSerializableEIP4844["blobs"];
        } | {
        blobVersionedHashes: TransactionSerializableEIP4844["blobVersionedHashes"];
        } | {
        sidecars: TransactionSerializableEIP4844["sidecars"];
        }, TransactionSerializableEIP4844>) ? "eip4844" : never) | (request extends ({
        accessList?: AccessList;
        authorizationList?: SignedAuthorizationList;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: undefined;
        maxFeePerBlobGas?: undefined;
        maxFeePerGas?: bigint;
        maxPriorityFeePerGas?: bigint;
        sidecars?: undefined;
        } | {
        accessList?: AccessList;
        authorizationList?: SignedAuthorizationList;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: undefined;
        maxFeePerBlobGas?: undefined;
        maxFeePerGas?: bigint;
        maxPriorityFeePerGas?: bigint;
        sidecars?: undefined;
        }) & {
        authorizationList: TransactionSerializableEIP7702["authorizationList"];
        } ? "eip7702" : never) | (request["type"] extends string ? Extract<request["type"], string> : never)>) ? T_6 extends "eip4844" ? TransactionRequestEIP4844 : never : never : never) | ((request["type"] extends string ? request["type"] : GetTransactionType<request, (request extends {
        accessList?: undefined;
        authorizationList?: undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: bigint;
        sidecars?: undefined;
        } & FeeValuesLegacy ? "legacy" : never) | (request extends {
        accessList?: AccessList;
        authorizationList?: undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: undefined;
        maxFeePerBlobGas?: undefined;
        maxFeePerGas?: bigint;
        maxPriorityFeePerGas?: bigint;
        sidecars?: undefined;
        } & (OneOf<    {
        maxFeePerGas: FeeValuesEIP1559["maxFeePerGas"];
        } | {
        maxPriorityFeePerGas: FeeValuesEIP1559["maxPriorityFeePerGas"];
        }, FeeValuesEIP1559> & {
        accessList?: TransactionSerializableEIP2930["accessList"] | undefined;
        }) ? "eip1559" : never) | (request extends {
        accessList?: AccessList;
        authorizationList?: undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: bigint;
        sidecars?: undefined;
        maxFeePerBlobGas?: undefined;
        maxFeePerGas?: undefined;
        maxPriorityFeePerGas?: undefined;
        } & {
        accessList: TransactionSerializableEIP2930["accessList"];
        } ? "eip2930" : never) | (request extends ({
        accessList?: AccessList;
        authorizationList?: undefined;
        blobs?: readonly `0x${string}`[] | readonly ByteArray[];
        blobVersionedHashes?: readonly `0x${string}`[];
        maxFeePerBlobGas?: bigint;
        maxFeePerGas?: bigint;
        maxPriorityFeePerGas?: bigint;
        sidecars?: false | readonly BlobSidecar<`0x${string}`>[];
        } | {
        accessList?: AccessList;
        authorizationList?: undefined;
        blobs?: readonly `0x${string}`[] | readonly ByteArray[];
        blobVersionedHashes?: readonly `0x${string}`[];
        maxFeePerBlobGas?: bigint;
        maxFeePerGas?: bigint;
        maxPriorityFeePerGas?: bigint;
        sidecars?: false | readonly BlobSidecar<`0x${string}`>[];
        }) & (ExactPartial<FeeValuesEIP4844> & OneOf<    {
        blobs: TransactionSerializableEIP4844["blobs"];
        } | {
        blobVersionedHashes: TransactionSerializableEIP4844["blobVersionedHashes"];
        } | {
        sidecars: TransactionSerializableEIP4844["sidecars"];
        }, TransactionSerializableEIP4844>) ? "eip4844" : never) | (request extends ({
        accessList?: AccessList;
        authorizationList?: SignedAuthorizationList;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: undefined;
        maxFeePerBlobGas?: undefined;
        maxFeePerGas?: bigint;
        maxPriorityFeePerGas?: bigint;
        sidecars?: undefined;
        } | {
        accessList?: AccessList;
        authorizationList?: SignedAuthorizationList;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: undefined;
        maxFeePerBlobGas?: undefined;
        maxFeePerGas?: bigint;
        maxPriorityFeePerGas?: bigint;
        sidecars?: undefined;
        }) & {
        authorizationList: TransactionSerializableEIP7702["authorizationList"];
        } ? "eip7702" : never) | (request["type"] extends string ? Extract<request["type"], string> : never)> extends "legacy" ? unknown : GetTransactionType<request, (request extends {
        accessList?: undefined;
        authorizationList?: undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: bigint;
        sidecars?: undefined;
        } & FeeValuesLegacy ? "legacy" : never) | (request extends {
        accessList?: AccessList;
        authorizationList?: undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: undefined;
        maxFeePerBlobGas?: undefined;
        maxFeePerGas?: bigint;
        maxPriorityFeePerGas?: bigint;
        sidecars?: undefined;
        } & (OneOf<    {
        maxFeePerGas: FeeValuesEIP1559["maxFeePerGas"];
        } | {
        maxPriorityFeePerGas: FeeValuesEIP1559["maxPriorityFeePerGas"];
        }, FeeValuesEIP1559> & {
        accessList?: TransactionSerializableEIP2930["accessList"] | undefined;
        }) ? "eip1559" : never) | (request extends {
        accessList?: AccessList;
        authorizationList?: undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: bigint;
        sidecars?: undefined;
        maxFeePerBlobGas?: undefined;
        maxFeePerGas?: undefined;
        maxPriorityFeePerGas?: undefined;
        } & {
        accessList: TransactionSerializableEIP2930["accessList"];
        } ? "eip2930" : never) | (request extends ({
        accessList?: AccessList;
        authorizationList?: undefined;
        blobs?: readonly `0x${string}`[] | readonly ByteArray[];
        blobVersionedHashes?: readonly `0x${string}`[];
        maxFeePerBlobGas?: bigint;
        maxFeePerGas?: bigint;
        maxPriorityFeePerGas?: bigint;
        sidecars?: false | readonly BlobSidecar<`0x${string}`>[];
        } | {
        accessList?: AccessList;
        authorizationList?: undefined;
        blobs?: readonly `0x${string}`[] | readonly ByteArray[];
        blobVersionedHashes?: readonly `0x${string}`[];
        maxFeePerBlobGas?: bigint;
        maxFeePerGas?: bigint;
        maxPriorityFeePerGas?: bigint;
        sidecars?: false | readonly BlobSidecar<`0x${string}`>[];
        }) & (ExactPartial<FeeValuesEIP4844> & OneOf<    {
        blobs: TransactionSerializableEIP4844["blobs"];
        } | {
        blobVersionedHashes: TransactionSerializableEIP4844["blobVersionedHashes"];
        } | {
        sidecars: TransactionSerializableEIP4844["sidecars"];
        }, TransactionSerializableEIP4844>) ? "eip4844" : never) | (request extends ({
        accessList?: AccessList;
        authorizationList?: SignedAuthorizationList;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: undefined;
        maxFeePerBlobGas?: undefined;
        maxFeePerGas?: bigint;
        maxPriorityFeePerGas?: bigint;
        sidecars?: undefined;
        } | {
        accessList?: AccessList;
        authorizationList?: SignedAuthorizationList;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: undefined;
        maxFeePerBlobGas?: undefined;
        maxFeePerGas?: bigint;
        maxPriorityFeePerGas?: bigint;
        sidecars?: undefined;
        }) & {
        authorizationList: TransactionSerializableEIP7702["authorizationList"];
        } ? "eip7702" : never) | (request["type"] extends string ? Extract<request["type"], string> : never)>) extends infer T_7 ? T_7 extends (request["type"] extends string ? request["type"] : GetTransactionType<request, (request extends {
        accessList?: undefined;
        authorizationList?: undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: bigint;
        sidecars?: undefined;
        } & FeeValuesLegacy ? "legacy" : never) | (request extends {
        accessList?: AccessList;
        authorizationList?: undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: undefined;
        maxFeePerBlobGas?: undefined;
        maxFeePerGas?: bigint;
        maxPriorityFeePerGas?: bigint;
        sidecars?: undefined;
        } & (OneOf<    {
        maxFeePerGas: FeeValuesEIP1559["maxFeePerGas"];
        } | {
        maxPriorityFeePerGas: FeeValuesEIP1559["maxPriorityFeePerGas"];
        }, FeeValuesEIP1559> & {
        accessList?: TransactionSerializableEIP2930["accessList"] | undefined;
        }) ? "eip1559" : never) | (request extends {
        accessList?: AccessList;
        authorizationList?: undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: bigint;
        sidecars?: undefined;
        maxFeePerBlobGas?: undefined;
        maxFeePerGas?: undefined;
        maxPriorityFeePerGas?: undefined;
        } & {
        accessList: TransactionSerializableEIP2930["accessList"];
        } ? "eip2930" : never) | (request extends ({
        accessList?: AccessList;
        authorizationList?: undefined;
        blobs?: readonly `0x${string}`[] | readonly ByteArray[];
        blobVersionedHashes?: readonly `0x${string}`[];
        maxFeePerBlobGas?: bigint;
        maxFeePerGas?: bigint;
        maxPriorityFeePerGas?: bigint;
        sidecars?: false | readonly BlobSidecar<`0x${string}`>[];
        } | {
        accessList?: AccessList;
        authorizationList?: undefined;
        blobs?: readonly `0x${string}`[] | readonly ByteArray[];
        blobVersionedHashes?: readonly `0x${string}`[];
        maxFeePerBlobGas?: bigint;
        maxFeePerGas?: bigint;
        maxPriorityFeePerGas?: bigint;
        sidecars?: false | readonly BlobSidecar<`0x${string}`>[];
        }) & (ExactPartial<FeeValuesEIP4844> & OneOf<    {
        blobs: TransactionSerializableEIP4844["blobs"];
        } | {
        blobVersionedHashes: TransactionSerializableEIP4844["blobVersionedHashes"];
        } | {
        sidecars: TransactionSerializableEIP4844["sidecars"];
        }, TransactionSerializableEIP4844>) ? "eip4844" : never) | (request extends ({
        accessList?: AccessList;
        authorizationList?: SignedAuthorizationList;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: undefined;
        maxFeePerBlobGas?: undefined;
        maxFeePerGas?: bigint;
        maxPriorityFeePerGas?: bigint;
        sidecars?: undefined;
        } | {
        accessList?: AccessList;
        authorizationList?: SignedAuthorizationList;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: undefined;
        maxFeePerBlobGas?: undefined;
        maxFeePerGas?: bigint;
        maxPriorityFeePerGas?: bigint;
        sidecars?: undefined;
        }) & {
        authorizationList: TransactionSerializableEIP7702["authorizationList"];
        } ? "eip7702" : never) | (request["type"] extends string ? Extract<request["type"], string> : never)> extends "legacy" ? unknown : GetTransactionType<request, (request extends {
        accessList?: undefined;
        authorizationList?: undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: bigint;
        sidecars?: undefined;
        } & FeeValuesLegacy ? "legacy" : never) | (request extends {
        accessList?: AccessList;
        authorizationList?: undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: undefined;
        maxFeePerBlobGas?: undefined;
        maxFeePerGas?: bigint;
        maxPriorityFeePerGas?: bigint;
        sidecars?: undefined;
        } & (OneOf<    {
        maxFeePerGas: FeeValuesEIP1559["maxFeePerGas"];
        } | {
        maxPriorityFeePerGas: FeeValuesEIP1559["maxPriorityFeePerGas"];
        }, FeeValuesEIP1559> & {
        accessList?: TransactionSerializableEIP2930["accessList"] | undefined;
        }) ? "eip1559" : never) | (request extends {
        accessList?: AccessList;
        authorizationList?: undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: bigint;
        sidecars?: undefined;
        maxFeePerBlobGas?: undefined;
        maxFeePerGas?: undefined;
        maxPriorityFeePerGas?: undefined;
        } & {
        accessList: TransactionSerializableEIP2930["accessList"];
        } ? "eip2930" : never) | (request extends ({
        accessList?: AccessList;
        authorizationList?: undefined;
        blobs?: readonly `0x${string}`[] | readonly ByteArray[];
        blobVersionedHashes?: readonly `0x${string}`[];
        maxFeePerBlobGas?: bigint;
        maxFeePerGas?: bigint;
        maxPriorityFeePerGas?: bigint;
        sidecars?: false | readonly BlobSidecar<`0x${string}`>[];
        } | {
        accessList?: AccessList;
        authorizationList?: undefined;
        blobs?: readonly `0x${string}`[] | readonly ByteArray[];
        blobVersionedHashes?: readonly `0x${string}`[];
        maxFeePerBlobGas?: bigint;
        maxFeePerGas?: bigint;
        maxPriorityFeePerGas?: bigint;
        sidecars?: false | readonly BlobSidecar<`0x${string}`>[];
        }) & (ExactPartial<FeeValuesEIP4844> & OneOf<    {
        blobs: TransactionSerializableEIP4844["blobs"];
        } | {
        blobVersionedHashes: TransactionSerializableEIP4844["blobVersionedHashes"];
        } | {
        sidecars: TransactionSerializableEIP4844["sidecars"];
        }, TransactionSerializableEIP4844>) ? "eip4844" : never) | (request extends ({
        accessList?: AccessList;
        authorizationList?: SignedAuthorizationList;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: undefined;
        maxFeePerBlobGas?: undefined;
        maxFeePerGas?: bigint;
        maxPriorityFeePerGas?: bigint;
        sidecars?: undefined;
        } | {
        accessList?: AccessList;
        authorizationList?: SignedAuthorizationList;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: undefined;
        maxFeePerBlobGas?: undefined;
        maxFeePerGas?: bigint;
        maxPriorityFeePerGas?: bigint;
        sidecars?: undefined;
        }) & {
        authorizationList: TransactionSerializableEIP7702["authorizationList"];
        } ? "eip7702" : never) | (request["type"] extends string ? Extract<request["type"], string> : never)>) ? T_7 extends "eip7702" ? TransactionRequestEIP7702 : never : never : never)> extends true ? unknown : ExactPartial<((request["type"] extends string ? request["type"] : GetTransactionType<request, (request extends {
        accessList?: undefined;
        authorizationList?: undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: bigint;
        sidecars?: undefined;
        } & FeeValuesLegacy ? "legacy" : never) | (request extends {
        accessList?: AccessList;
        authorizationList?: undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: undefined;
        maxFeePerBlobGas?: undefined;
        maxFeePerGas?: bigint;
        maxPriorityFeePerGas?: bigint;
        sidecars?: undefined;
        } & (OneOf<    {
        maxFeePerGas: FeeValuesEIP1559["maxFeePerGas"];
        } | {
        maxPriorityFeePerGas: FeeValuesEIP1559["maxPriorityFeePerGas"];
        }, FeeValuesEIP1559> & {
        accessList?: TransactionSerializableEIP2930["accessList"] | undefined;
        }) ? "eip1559" : never) | (request extends {
        accessList?: AccessList;
        authorizationList?: undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: bigint;
        sidecars?: undefined;
        maxFeePerBlobGas?: undefined;
        maxFeePerGas?: undefined;
        maxPriorityFeePerGas?: undefined;
        } & {
        accessList: TransactionSerializableEIP2930["accessList"];
        } ? "eip2930" : never) | (request extends ({
        accessList?: AccessList;
        authorizationList?: undefined;
        blobs?: readonly `0x${string}`[] | readonly ByteArray[];
        blobVersionedHashes?: readonly `0x${string}`[];
        maxFeePerBlobGas?: bigint;
        maxFeePerGas?: bigint;
        maxPriorityFeePerGas?: bigint;
        sidecars?: false | readonly BlobSidecar<`0x${string}`>[];
        } | {
        accessList?: AccessList;
        authorizationList?: undefined;
        blobs?: readonly `0x${string}`[] | readonly ByteArray[];
        blobVersionedHashes?: readonly `0x${string}`[];
        maxFeePerBlobGas?: bigint;
        maxFeePerGas?: bigint;
        maxPriorityFeePerGas?: bigint;
        sidecars?: false | readonly BlobSidecar<`0x${string}`>[];
        }) & (ExactPartial<FeeValuesEIP4844> & OneOf<    {
        blobs: TransactionSerializableEIP4844["blobs"];
        } | {
        blobVersionedHashes: TransactionSerializableEIP4844["blobVersionedHashes"];
        } | {
        sidecars: TransactionSerializableEIP4844["sidecars"];
        }, TransactionSerializableEIP4844>) ? "eip4844" : never) | (request extends ({
        accessList?: AccessList;
        authorizationList?: SignedAuthorizationList;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: undefined;
        maxFeePerBlobGas?: undefined;
        maxFeePerGas?: bigint;
        maxPriorityFeePerGas?: bigint;
        sidecars?: undefined;
        } | {
        accessList?: AccessList;
        authorizationList?: SignedAuthorizationList;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: undefined;
        maxFeePerBlobGas?: undefined;
        maxFeePerGas?: bigint;
        maxPriorityFeePerGas?: bigint;
        sidecars?: undefined;
        }) & {
        authorizationList: TransactionSerializableEIP7702["authorizationList"];
        } ? "eip7702" : never) | (request["type"] extends string ? Extract<request["type"], string> : never)> extends "legacy" ? unknown : GetTransactionType<request, (request extends {
        accessList?: undefined;
        authorizationList?: undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: bigint;
        sidecars?: undefined;
        } & FeeValuesLegacy ? "legacy" : never) | (request extends {
        accessList?: AccessList;
        authorizationList?: undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: undefined;
        maxFeePerBlobGas?: undefined;
        maxFeePerGas?: bigint;
        maxPriorityFeePerGas?: bigint;
        sidecars?: undefined;
        } & (OneOf<    {
        maxFeePerGas: FeeValuesEIP1559["maxFeePerGas"];
        } | {
        maxPriorityFeePerGas: FeeValuesEIP1559["maxPriorityFeePerGas"];
        }, FeeValuesEIP1559> & {
        accessList?: TransactionSerializableEIP2930["accessList"] | undefined;
        }) ? "eip1559" : never) | (request extends {
        accessList?: AccessList;
        authorizationList?: undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: bigint;
        sidecars?: undefined;
        maxFeePerBlobGas?: undefined;
        maxFeePerGas?: undefined;
        maxPriorityFeePerGas?: undefined;
        } & {
        accessList: TransactionSerializableEIP2930["accessList"];
        } ? "eip2930" : never) | (request extends ({
        accessList?: AccessList;
        authorizationList?: undefined;
        blobs?: readonly `0x${string}`[] | readonly ByteArray[];
        blobVersionedHashes?: readonly `0x${string}`[];
        maxFeePerBlobGas?: bigint;
        maxFeePerGas?: bigint;
        maxPriorityFeePerGas?: bigint;
        sidecars?: false | readonly BlobSidecar<`0x${string}`>[];
        } | {
        accessList?: AccessList;
        authorizationList?: undefined;
        blobs?: readonly `0x${string}`[] | readonly ByteArray[];
        blobVersionedHashes?: readonly `0x${string}`[];
        maxFeePerBlobGas?: bigint;
        maxFeePerGas?: bigint;
        maxPriorityFeePerGas?: bigint;
        sidecars?: false | readonly BlobSidecar<`0x${string}`>[];
        }) & (ExactPartial<FeeValuesEIP4844> & OneOf<    {
        blobs: TransactionSerializableEIP4844["blobs"];
        } | {
        blobVersionedHashes: TransactionSerializableEIP4844["blobVersionedHashes"];
        } | {
        sidecars: TransactionSerializableEIP4844["sidecars"];
        }, TransactionSerializableEIP4844>) ? "eip4844" : never) | (request extends ({
        accessList?: AccessList;
        authorizationList?: SignedAuthorizationList;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: undefined;
        maxFeePerBlobGas?: undefined;
        maxFeePerGas?: bigint;
        maxPriorityFeePerGas?: bigint;
        sidecars?: undefined;
        } | {
        accessList?: AccessList;
        authorizationList?: SignedAuthorizationList;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: undefined;
        maxFeePerBlobGas?: undefined;
        maxFeePerGas?: bigint;
        maxPriorityFeePerGas?: bigint;
        sidecars?: undefined;
        }) & {
        authorizationList: TransactionSerializableEIP7702["authorizationList"];
        } ? "eip7702" : never) | (request["type"] extends string ? Extract<request["type"], string> : never)>) extends infer T_3 ? T_3 extends (request["type"] extends string ? request["type"] : GetTransactionType<request, (request extends {
        accessList?: undefined;
        authorizationList?: undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: bigint;
        sidecars?: undefined;
        } & FeeValuesLegacy ? "legacy" : never) | (request extends {
        accessList?: AccessList;
        authorizationList?: undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: undefined;
        maxFeePerBlobGas?: undefined;
        maxFeePerGas?: bigint;
        maxPriorityFeePerGas?: bigint;
        sidecars?: undefined;
        } & (OneOf<    {
        maxFeePerGas: FeeValuesEIP1559["maxFeePerGas"];
        } | {
        maxPriorityFeePerGas: FeeValuesEIP1559["maxPriorityFeePerGas"];
        }, FeeValuesEIP1559> & {
        accessList?: TransactionSerializableEIP2930["accessList"] | undefined;
        }) ? "eip1559" : never) | (request extends {
        accessList?: AccessList;
        authorizationList?: undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: bigint;
        sidecars?: undefined;
        maxFeePerBlobGas?: undefined;
        maxFeePerGas?: undefined;
        maxPriorityFeePerGas?: undefined;
        } & {
        accessList: TransactionSerializableEIP2930["accessList"];
        } ? "eip2930" : never) | (request extends ({
        accessList?: AccessList;
        authorizationList?: undefined;
        blobs?: readonly `0x${string}`[] | readonly ByteArray[];
        blobVersionedHashes?: readonly `0x${string}`[];
        maxFeePerBlobGas?: bigint;
        maxFeePerGas?: bigint;
        maxPriorityFeePerGas?: bigint;
        sidecars?: false | readonly BlobSidecar<`0x${string}`>[];
        } | {
        accessList?: AccessList;
        authorizationList?: undefined;
        blobs?: readonly `0x${string}`[] | readonly ByteArray[];
        blobVersionedHashes?: readonly `0x${string}`[];
        maxFeePerBlobGas?: bigint;
        maxFeePerGas?: bigint;
        maxPriorityFeePerGas?: bigint;
        sidecars?: false | readonly BlobSidecar<`0x${string}`>[];
        }) & (ExactPartial<FeeValuesEIP4844> & OneOf<    {
        blobs: TransactionSerializableEIP4844["blobs"];
        } | {
        blobVersionedHashes: TransactionSerializableEIP4844["blobVersionedHashes"];
        } | {
        sidecars: TransactionSerializableEIP4844["sidecars"];
        }, TransactionSerializableEIP4844>) ? "eip4844" : never) | (request extends ({
        accessList?: AccessList;
        authorizationList?: SignedAuthorizationList;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: undefined;
        maxFeePerBlobGas?: undefined;
        maxFeePerGas?: bigint;
        maxPriorityFeePerGas?: bigint;
        sidecars?: undefined;
        } | {
        accessList?: AccessList;
        authorizationList?: SignedAuthorizationList;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: undefined;
        maxFeePerBlobGas?: undefined;
        maxFeePerGas?: bigint;
        maxPriorityFeePerGas?: bigint;
        sidecars?: undefined;
        }) & {
        authorizationList: TransactionSerializableEIP7702["authorizationList"];
        } ? "eip7702" : never) | (request["type"] extends string ? Extract<request["type"], string> : never)> extends "legacy" ? unknown : GetTransactionType<request, (request extends {
        accessList?: undefined;
        authorizationList?: undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: bigint;
        sidecars?: undefined;
        } & FeeValuesLegacy ? "legacy" : never) | (request extends {
        accessList?: AccessList;
        authorizationList?: undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: undefined;
        maxFeePerBlobGas?: undefined;
        maxFeePerGas?: bigint;
        maxPriorityFeePerGas?: bigint;
        sidecars?: undefined;
        } & (OneOf<    {
        maxFeePerGas: FeeValuesEIP1559["maxFeePerGas"];
        } | {
        maxPriorityFeePerGas: FeeValuesEIP1559["maxPriorityFeePerGas"];
        }, FeeValuesEIP1559> & {
        accessList?: TransactionSerializableEIP2930["accessList"] | undefined;
        }) ? "eip1559" : never) | (request extends {
        accessList?: AccessList;
        authorizationList?: undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: bigint;
        sidecars?: undefined;
        maxFeePerBlobGas?: undefined;
        maxFeePerGas?: undefined;
        maxPriorityFeePerGas?: undefined;
        } & {
        accessList: TransactionSerializableEIP2930["accessList"];
        } ? "eip2930" : never) | (request extends ({
        accessList?: AccessList;
        authorizationList?: undefined;
        blobs?: readonly `0x${string}`[] | readonly ByteArray[];
        blobVersionedHashes?: readonly `0x${string}`[];
        maxFeePerBlobGas?: bigint;
        maxFeePerGas?: bigint;
        maxPriorityFeePerGas?: bigint;
        sidecars?: false | readonly BlobSidecar<`0x${string}`>[];
        } | {
        accessList?: AccessList;
        authorizationList?: undefined;
        blobs?: readonly `0x${string}`[] | readonly ByteArray[];
        blobVersionedHashes?: readonly `0x${string}`[];
        maxFeePerBlobGas?: bigint;
        maxFeePerGas?: bigint;
        maxPriorityFeePerGas?: bigint;
        sidecars?: false | readonly BlobSidecar<`0x${string}`>[];
        }) & (ExactPartial<FeeValuesEIP4844> & OneOf<    {
        blobs: TransactionSerializableEIP4844["blobs"];
        } | {
        blobVersionedHashes: TransactionSerializableEIP4844["blobVersionedHashes"];
        } | {
        sidecars: TransactionSerializableEIP4844["sidecars"];
        }, TransactionSerializableEIP4844>) ? "eip4844" : never) | (request extends ({
        accessList?: AccessList;
        authorizationList?: SignedAuthorizationList;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: undefined;
        maxFeePerBlobGas?: undefined;
        maxFeePerGas?: bigint;
        maxPriorityFeePerGas?: bigint;
        sidecars?: undefined;
        } | {
        accessList?: AccessList;
        authorizationList?: SignedAuthorizationList;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: undefined;
        maxFeePerBlobGas?: undefined;
        maxFeePerGas?: bigint;
        maxPriorityFeePerGas?: bigint;
        sidecars?: undefined;
        }) & {
        authorizationList: TransactionSerializableEIP7702["authorizationList"];
        } ? "eip7702" : never) | (request["type"] extends string ? Extract<request["type"], string> : never)>) ? T_3 extends "legacy" ? TransactionRequestLegacy : never : never : never) | ((request["type"] extends string ? request["type"] : GetTransactionType<request, (request extends {
        accessList?: undefined;
        authorizationList?: undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: bigint;
        sidecars?: undefined;
        } & FeeValuesLegacy ? "legacy" : never) | (request extends {
        accessList?: AccessList;
        authorizationList?: undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: undefined;
        maxFeePerBlobGas?: undefined;
        maxFeePerGas?: bigint;
        maxPriorityFeePerGas?: bigint;
        sidecars?: undefined;
        } & (OneOf<    {
        maxFeePerGas: FeeValuesEIP1559["maxFeePerGas"];
        } | {
        maxPriorityFeePerGas: FeeValuesEIP1559["maxPriorityFeePerGas"];
        }, FeeValuesEIP1559> & {
        accessList?: TransactionSerializableEIP2930["accessList"] | undefined;
        }) ? "eip1559" : never) | (request extends {
        accessList?: AccessList;
        authorizationList?: undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: bigint;
        sidecars?: undefined;
        maxFeePerBlobGas?: undefined;
        maxFeePerGas?: undefined;
        maxPriorityFeePerGas?: undefined;
        } & {
        accessList: TransactionSerializableEIP2930["accessList"];
        } ? "eip2930" : never) | (request extends ({
        accessList?: AccessList;
        authorizationList?: undefined;
        blobs?: readonly `0x${string}`[] | readonly ByteArray[];
        blobVersionedHashes?: readonly `0x${string}`[];
        maxFeePerBlobGas?: bigint;
        maxFeePerGas?: bigint;
        maxPriorityFeePerGas?: bigint;
        sidecars?: false | readonly BlobSidecar<`0x${string}`>[];
        } | {
        accessList?: AccessList;
        authorizationList?: undefined;
        blobs?: readonly `0x${string}`[] | readonly ByteArray[];
        blobVersionedHashes?: readonly `0x${string}`[];
        maxFeePerBlobGas?: bigint;
        maxFeePerGas?: bigint;
        maxPriorityFeePerGas?: bigint;
        sidecars?: false | readonly BlobSidecar<`0x${string}`>[];
        }) & (ExactPartial<FeeValuesEIP4844> & OneOf<    {
        blobs: TransactionSerializableEIP4844["blobs"];
        } | {
        blobVersionedHashes: TransactionSerializableEIP4844["blobVersionedHashes"];
        } | {
        sidecars: TransactionSerializableEIP4844["sidecars"];
        }, TransactionSerializableEIP4844>) ? "eip4844" : never) | (request extends ({
        accessList?: AccessList;
        authorizationList?: SignedAuthorizationList;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: undefined;
        maxFeePerBlobGas?: undefined;
        maxFeePerGas?: bigint;
        maxPriorityFeePerGas?: bigint;
        sidecars?: undefined;
        } | {
        accessList?: AccessList;
        authorizationList?: SignedAuthorizationList;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: undefined;
        maxFeePerBlobGas?: undefined;
        maxFeePerGas?: bigint;
        maxPriorityFeePerGas?: bigint;
        sidecars?: undefined;
        }) & {
        authorizationList: TransactionSerializableEIP7702["authorizationList"];
        } ? "eip7702" : never) | (request["type"] extends string ? Extract<request["type"], string> : never)> extends "legacy" ? unknown : GetTransactionType<request, (request extends {
        accessList?: undefined;
        authorizationList?: undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: bigint;
        sidecars?: undefined;
        } & FeeValuesLegacy ? "legacy" : never) | (request extends {
        accessList?: AccessList;
        authorizationList?: undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: undefined;
        maxFeePerBlobGas?: undefined;
        maxFeePerGas?: bigint;
        maxPriorityFeePerGas?: bigint;
        sidecars?: undefined;
        } & (OneOf<    {
        maxFeePerGas: FeeValuesEIP1559["maxFeePerGas"];
        } | {
        maxPriorityFeePerGas: FeeValuesEIP1559["maxPriorityFeePerGas"];
        }, FeeValuesEIP1559> & {
        accessList?: TransactionSerializableEIP2930["accessList"] | undefined;
        }) ? "eip1559" : never) | (request extends {
        accessList?: AccessList;
        authorizationList?: undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: bigint;
        sidecars?: undefined;
        maxFeePerBlobGas?: undefined;
        maxFeePerGas?: undefined;
        maxPriorityFeePerGas?: undefined;
        } & {
        accessList: TransactionSerializableEIP2930["accessList"];
        } ? "eip2930" : never) | (request extends ({
        accessList?: AccessList;
        authorizationList?: undefined;
        blobs?: readonly `0x${string}`[] | readonly ByteArray[];
        blobVersionedHashes?: readonly `0x${string}`[];
        maxFeePerBlobGas?: bigint;
        maxFeePerGas?: bigint;
        maxPriorityFeePerGas?: bigint;
        sidecars?: false | readonly BlobSidecar<`0x${string}`>[];
        } | {
        accessList?: AccessList;
        authorizationList?: undefined;
        blobs?: readonly `0x${string}`[] | readonly ByteArray[];
        blobVersionedHashes?: readonly `0x${string}`[];
        maxFeePerBlobGas?: bigint;
        maxFeePerGas?: bigint;
        maxPriorityFeePerGas?: bigint;
        sidecars?: false | readonly BlobSidecar<`0x${string}`>[];
        }) & (ExactPartial<FeeValuesEIP4844> & OneOf<    {
        blobs: TransactionSerializableEIP4844["blobs"];
        } | {
        blobVersionedHashes: TransactionSerializableEIP4844["blobVersionedHashes"];
        } | {
        sidecars: TransactionSerializableEIP4844["sidecars"];
        }, TransactionSerializableEIP4844>) ? "eip4844" : never) | (request extends ({
        accessList?: AccessList;
        authorizationList?: SignedAuthorizationList;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: undefined;
        maxFeePerBlobGas?: undefined;
        maxFeePerGas?: bigint;
        maxPriorityFeePerGas?: bigint;
        sidecars?: undefined;
        } | {
        accessList?: AccessList;
        authorizationList?: SignedAuthorizationList;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: undefined;
        maxFeePerBlobGas?: undefined;
        maxFeePerGas?: bigint;
        maxPriorityFeePerGas?: bigint;
        sidecars?: undefined;
        }) & {
        authorizationList: TransactionSerializableEIP7702["authorizationList"];
        } ? "eip7702" : never) | (request["type"] extends string ? Extract<request["type"], string> : never)>) extends infer T_4 ? T_4 extends (request["type"] extends string ? request["type"] : GetTransactionType<request, (request extends {
        accessList?: undefined;
        authorizationList?: undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: bigint;
        sidecars?: undefined;
        } & FeeValuesLegacy ? "legacy" : never) | (request extends {
        accessList?: AccessList;
        authorizationList?: undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: undefined;
        maxFeePerBlobGas?: undefined;
        maxFeePerGas?: bigint;
        maxPriorityFeePerGas?: bigint;
        sidecars?: undefined;
        } & (OneOf<    {
        maxFeePerGas: FeeValuesEIP1559["maxFeePerGas"];
        } | {
        maxPriorityFeePerGas: FeeValuesEIP1559["maxPriorityFeePerGas"];
        }, FeeValuesEIP1559> & {
        accessList?: TransactionSerializableEIP2930["accessList"] | undefined;
        }) ? "eip1559" : never) | (request extends {
        accessList?: AccessList;
        authorizationList?: undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: bigint;
        sidecars?: undefined;
        maxFeePerBlobGas?: undefined;
        maxFeePerGas?: undefined;
        maxPriorityFeePerGas?: undefined;
        } & {
        accessList: TransactionSerializableEIP2930["accessList"];
        } ? "eip2930" : never) | (request extends ({
        accessList?: AccessList;
        authorizationList?: undefined;
        blobs?: readonly `0x${string}`[] | readonly ByteArray[];
        blobVersionedHashes?: readonly `0x${string}`[];
        maxFeePerBlobGas?: bigint;
        maxFeePerGas?: bigint;
        maxPriorityFeePerGas?: bigint;
        sidecars?: false | readonly BlobSidecar<`0x${string}`>[];
        } | {
        accessList?: AccessList;
        authorizationList?: undefined;
        blobs?: readonly `0x${string}`[] | readonly ByteArray[];
        blobVersionedHashes?: readonly `0x${string}`[];
        maxFeePerBlobGas?: bigint;
        maxFeePerGas?: bigint;
        maxPriorityFeePerGas?: bigint;
        sidecars?: false | readonly BlobSidecar<`0x${string}`>[];
        }) & (ExactPartial<FeeValuesEIP4844> & OneOf<    {
        blobs: TransactionSerializableEIP4844["blobs"];
        } | {
        blobVersionedHashes: TransactionSerializableEIP4844["blobVersionedHashes"];
        } | {
        sidecars: TransactionSerializableEIP4844["sidecars"];
        }, TransactionSerializableEIP4844>) ? "eip4844" : never) | (request extends ({
        accessList?: AccessList;
        authorizationList?: SignedAuthorizationList;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: undefined;
        maxFeePerBlobGas?: undefined;
        maxFeePerGas?: bigint;
        maxPriorityFeePerGas?: bigint;
        sidecars?: undefined;
        } | {
        accessList?: AccessList;
        authorizationList?: SignedAuthorizationList;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: undefined;
        maxFeePerBlobGas?: undefined;
        maxFeePerGas?: bigint;
        maxPriorityFeePerGas?: bigint;
        sidecars?: undefined;
        }) & {
        authorizationList: TransactionSerializableEIP7702["authorizationList"];
        } ? "eip7702" : never) | (request["type"] extends string ? Extract<request["type"], string> : never)> extends "legacy" ? unknown : GetTransactionType<request, (request extends {
        accessList?: undefined;
        authorizationList?: undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: bigint;
        sidecars?: undefined;
        } & FeeValuesLegacy ? "legacy" : never) | (request extends {
        accessList?: AccessList;
        authorizationList?: undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: undefined;
        maxFeePerBlobGas?: undefined;
        maxFeePerGas?: bigint;
        maxPriorityFeePerGas?: bigint;
        sidecars?: undefined;
        } & (OneOf<    {
        maxFeePerGas: FeeValuesEIP1559["maxFeePerGas"];
        } | {
        maxPriorityFeePerGas: FeeValuesEIP1559["maxPriorityFeePerGas"];
        }, FeeValuesEIP1559> & {
        accessList?: TransactionSerializableEIP2930["accessList"] | undefined;
        }) ? "eip1559" : never) | (request extends {
        accessList?: AccessList;
        authorizationList?: undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: bigint;
        sidecars?: undefined;
        maxFeePerBlobGas?: undefined;
        maxFeePerGas?: undefined;
        maxPriorityFeePerGas?: undefined;
        } & {
        accessList: TransactionSerializableEIP2930["accessList"];
        } ? "eip2930" : never) | (request extends ({
        accessList?: AccessList;
        authorizationList?: undefined;
        blobs?: readonly `0x${string}`[] | readonly ByteArray[];
        blobVersionedHashes?: readonly `0x${string}`[];
        maxFeePerBlobGas?: bigint;
        maxFeePerGas?: bigint;
        maxPriorityFeePerGas?: bigint;
        sidecars?: false | readonly BlobSidecar<`0x${string}`>[];
        } | {
        accessList?: AccessList;
        authorizationList?: undefined;
        blobs?: readonly `0x${string}`[] | readonly ByteArray[];
        blobVersionedHashes?: readonly `0x${string}`[];
        maxFeePerBlobGas?: bigint;
        maxFeePerGas?: bigint;
        maxPriorityFeePerGas?: bigint;
        sidecars?: false | readonly BlobSidecar<`0x${string}`>[];
        }) & (ExactPartial<FeeValuesEIP4844> & OneOf<    {
        blobs: TransactionSerializableEIP4844["blobs"];
        } | {
        blobVersionedHashes: TransactionSerializableEIP4844["blobVersionedHashes"];
        } | {
        sidecars: TransactionSerializableEIP4844["sidecars"];
        }, TransactionSerializableEIP4844>) ? "eip4844" : never) | (request extends ({
        accessList?: AccessList;
        authorizationList?: SignedAuthorizationList;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: undefined;
        maxFeePerBlobGas?: undefined;
        maxFeePerGas?: bigint;
        maxPriorityFeePerGas?: bigint;
        sidecars?: undefined;
        } | {
        accessList?: AccessList;
        authorizationList?: SignedAuthorizationList;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: undefined;
        maxFeePerBlobGas?: undefined;
        maxFeePerGas?: bigint;
        maxPriorityFeePerGas?: bigint;
        sidecars?: undefined;
        }) & {
        authorizationList: TransactionSerializableEIP7702["authorizationList"];
        } ? "eip7702" : never) | (request["type"] extends string ? Extract<request["type"], string> : never)>) ? T_4 extends "eip1559" ? TransactionRequestEIP1559 : never : never : never) | ((request["type"] extends string ? request["type"] : GetTransactionType<request, (request extends {
        accessList?: undefined;
        authorizationList?: undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: bigint;
        sidecars?: undefined;
        } & FeeValuesLegacy ? "legacy" : never) | (request extends {
        accessList?: AccessList;
        authorizationList?: undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: undefined;
        maxFeePerBlobGas?: undefined;
        maxFeePerGas?: bigint;
        maxPriorityFeePerGas?: bigint;
        sidecars?: undefined;
        } & (OneOf<    {
        maxFeePerGas: FeeValuesEIP1559["maxFeePerGas"];
        } | {
        maxPriorityFeePerGas: FeeValuesEIP1559["maxPriorityFeePerGas"];
        }, FeeValuesEIP1559> & {
        accessList?: TransactionSerializableEIP2930["accessList"] | undefined;
        }) ? "eip1559" : never) | (request extends {
        accessList?: AccessList;
        authorizationList?: undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: bigint;
        sidecars?: undefined;
        maxFeePerBlobGas?: undefined;
        maxFeePerGas?: undefined;
        maxPriorityFeePerGas?: undefined;
        } & {
        accessList: TransactionSerializableEIP2930["accessList"];
        } ? "eip2930" : never) | (request extends ({
        accessList?: AccessList;
        authorizationList?: undefined;
        blobs?: readonly `0x${string}`[] | readonly ByteArray[];
        blobVersionedHashes?: readonly `0x${string}`[];
        maxFeePerBlobGas?: bigint;
        maxFeePerGas?: bigint;
        maxPriorityFeePerGas?: bigint;
        sidecars?: false | readonly BlobSidecar<`0x${string}`>[];
        } | {
        accessList?: AccessList;
        authorizationList?: undefined;
        blobs?: readonly `0x${string}`[] | readonly ByteArray[];
        blobVersionedHashes?: readonly `0x${string}`[];
        maxFeePerBlobGas?: bigint;
        maxFeePerGas?: bigint;
        maxPriorityFeePerGas?: bigint;
        sidecars?: false | readonly BlobSidecar<`0x${string}`>[];
        }) & (ExactPartial<FeeValuesEIP4844> & OneOf<    {
        blobs: TransactionSerializableEIP4844["blobs"];
        } | {
        blobVersionedHashes: TransactionSerializableEIP4844["blobVersionedHashes"];
        } | {
        sidecars: TransactionSerializableEIP4844["sidecars"];
        }, TransactionSerializableEIP4844>) ? "eip4844" : never) | (request extends ({
        accessList?: AccessList;
        authorizationList?: SignedAuthorizationList;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: undefined;
        maxFeePerBlobGas?: undefined;
        maxFeePerGas?: bigint;
        maxPriorityFeePerGas?: bigint;
        sidecars?: undefined;
        } | {
        accessList?: AccessList;
        authorizationList?: SignedAuthorizationList;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: undefined;
        maxFeePerBlobGas?: undefined;
        maxFeePerGas?: bigint;
        maxPriorityFeePerGas?: bigint;
        sidecars?: undefined;
        }) & {
        authorizationList: TransactionSerializableEIP7702["authorizationList"];
        } ? "eip7702" : never) | (request["type"] extends string ? Extract<request["type"], string> : never)> extends "legacy" ? unknown : GetTransactionType<request, (request extends {
        accessList?: undefined;
        authorizationList?: undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: bigint;
        sidecars?: undefined;
        } & FeeValuesLegacy ? "legacy" : never) | (request extends {
        accessList?: AccessList;
        authorizationList?: undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: undefined;
        maxFeePerBlobGas?: undefined;
        maxFeePerGas?: bigint;
        maxPriorityFeePerGas?: bigint;
        sidecars?: undefined;
        } & (OneOf<    {
        maxFeePerGas: FeeValuesEIP1559["maxFeePerGas"];
        } | {
        maxPriorityFeePerGas: FeeValuesEIP1559["maxPriorityFeePerGas"];
        }, FeeValuesEIP1559> & {
        accessList?: TransactionSerializableEIP2930["accessList"] | undefined;
        }) ? "eip1559" : never) | (request extends {
        accessList?: AccessList;
        authorizationList?: undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: bigint;
        sidecars?: undefined;
        maxFeePerBlobGas?: undefined;
        maxFeePerGas?: undefined;
        maxPriorityFeePerGas?: undefined;
        } & {
        accessList: TransactionSerializableEIP2930["accessList"];
        } ? "eip2930" : never) | (request extends ({
        accessList?: AccessList;
        authorizationList?: undefined;
        blobs?: readonly `0x${string}`[] | readonly ByteArray[];
        blobVersionedHashes?: readonly `0x${string}`[];
        maxFeePerBlobGas?: bigint;
        maxFeePerGas?: bigint;
        maxPriorityFeePerGas?: bigint;
        sidecars?: false | readonly BlobSidecar<`0x${string}`>[];
        } | {
        accessList?: AccessList;
        authorizationList?: undefined;
        blobs?: readonly `0x${string}`[] | readonly ByteArray[];
        blobVersionedHashes?: readonly `0x${string}`[];
        maxFeePerBlobGas?: bigint;
        maxFeePerGas?: bigint;
        maxPriorityFeePerGas?: bigint;
        sidecars?: false | readonly BlobSidecar<`0x${string}`>[];
        }) & (ExactPartial<FeeValuesEIP4844> & OneOf<    {
        blobs: TransactionSerializableEIP4844["blobs"];
        } | {
        blobVersionedHashes: TransactionSerializableEIP4844["blobVersionedHashes"];
        } | {
        sidecars: TransactionSerializableEIP4844["sidecars"];
        }, TransactionSerializableEIP4844>) ? "eip4844" : never) | (request extends ({
        accessList?: AccessList;
        authorizationList?: SignedAuthorizationList;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: undefined;
        maxFeePerBlobGas?: undefined;
        maxFeePerGas?: bigint;
        maxPriorityFeePerGas?: bigint;
        sidecars?: undefined;
        } | {
        accessList?: AccessList;
        authorizationList?: SignedAuthorizationList;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: undefined;
        maxFeePerBlobGas?: undefined;
        maxFeePerGas?: bigint;
        maxPriorityFeePerGas?: bigint;
        sidecars?: undefined;
        }) & {
        authorizationList: TransactionSerializableEIP7702["authorizationList"];
        } ? "eip7702" : never) | (request["type"] extends string ? Extract<request["type"], string> : never)>) extends infer T_5 ? T_5 extends (request["type"] extends string ? request["type"] : GetTransactionType<request, (request extends {
        accessList?: undefined;
        authorizationList?: undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: bigint;
        sidecars?: undefined;
        } & FeeValuesLegacy ? "legacy" : never) | (request extends {
        accessList?: AccessList;
        authorizationList?: undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: undefined;
        maxFeePerBlobGas?: undefined;
        maxFeePerGas?: bigint;
        maxPriorityFeePerGas?: bigint;
        sidecars?: undefined;
        } & (OneOf<    {
        maxFeePerGas: FeeValuesEIP1559["maxFeePerGas"];
        } | {
        maxPriorityFeePerGas: FeeValuesEIP1559["maxPriorityFeePerGas"];
        }, FeeValuesEIP1559> & {
        accessList?: TransactionSerializableEIP2930["accessList"] | undefined;
        }) ? "eip1559" : never) | (request extends {
        accessList?: AccessList;
        authorizationList?: undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: bigint;
        sidecars?: undefined;
        maxFeePerBlobGas?: undefined;
        maxFeePerGas?: undefined;
        maxPriorityFeePerGas?: undefined;
        } & {
        accessList: TransactionSerializableEIP2930["accessList"];
        } ? "eip2930" : never) | (request extends ({
        accessList?: AccessList;
        authorizationList?: undefined;
        blobs?: readonly `0x${string}`[] | readonly ByteArray[];
        blobVersionedHashes?: readonly `0x${string}`[];
        maxFeePerBlobGas?: bigint;
        maxFeePerGas?: bigint;
        maxPriorityFeePerGas?: bigint;
        sidecars?: false | readonly BlobSidecar<`0x${string}`>[];
        } | {
        accessList?: AccessList;
        authorizationList?: undefined;
        blobs?: readonly `0x${string}`[] | readonly ByteArray[];
        blobVersionedHashes?: readonly `0x${string}`[];
        maxFeePerBlobGas?: bigint;
        maxFeePerGas?: bigint;
        maxPriorityFeePerGas?: bigint;
        sidecars?: false | readonly BlobSidecar<`0x${string}`>[];
        }) & (ExactPartial<FeeValuesEIP4844> & OneOf<    {
        blobs: TransactionSerializableEIP4844["blobs"];
        } | {
        blobVersionedHashes: TransactionSerializableEIP4844["blobVersionedHashes"];
        } | {
        sidecars: TransactionSerializableEIP4844["sidecars"];
        }, TransactionSerializableEIP4844>) ? "eip4844" : never) | (request extends ({
        accessList?: AccessList;
        authorizationList?: SignedAuthorizationList;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: undefined;
        maxFeePerBlobGas?: undefined;
        maxFeePerGas?: bigint;
        maxPriorityFeePerGas?: bigint;
        sidecars?: undefined;
        } | {
        accessList?: AccessList;
        authorizationList?: SignedAuthorizationList;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: undefined;
        maxFeePerBlobGas?: undefined;
        maxFeePerGas?: bigint;
        maxPriorityFeePerGas?: bigint;
        sidecars?: undefined;
        }) & {
        authorizationList: TransactionSerializableEIP7702["authorizationList"];
        } ? "eip7702" : never) | (request["type"] extends string ? Extract<request["type"], string> : never)> extends "legacy" ? unknown : GetTransactionType<request, (request extends {
        accessList?: undefined;
        authorizationList?: undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: bigint;
        sidecars?: undefined;
        } & FeeValuesLegacy ? "legacy" : never) | (request extends {
        accessList?: AccessList;
        authorizationList?: undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: undefined;
        maxFeePerBlobGas?: undefined;
        maxFeePerGas?: bigint;
        maxPriorityFeePerGas?: bigint;
        sidecars?: undefined;
        } & (OneOf<    {
        maxFeePerGas: FeeValuesEIP1559["maxFeePerGas"];
        } | {
        maxPriorityFeePerGas: FeeValuesEIP1559["maxPriorityFeePerGas"];
        }, FeeValuesEIP1559> & {
        accessList?: TransactionSerializableEIP2930["accessList"] | undefined;
        }) ? "eip1559" : never) | (request extends {
        accessList?: AccessList;
        authorizationList?: undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: bigint;
        sidecars?: undefined;
        maxFeePerBlobGas?: undefined;
        maxFeePerGas?: undefined;
        maxPriorityFeePerGas?: undefined;
        } & {
        accessList: TransactionSerializableEIP2930["accessList"];
        } ? "eip2930" : never) | (request extends ({
        accessList?: AccessList;
        authorizationList?: undefined;
        blobs?: readonly `0x${string}`[] | readonly ByteArray[];
        blobVersionedHashes?: readonly `0x${string}`[];
        maxFeePerBlobGas?: bigint;
        maxFeePerGas?: bigint;
        maxPriorityFeePerGas?: bigint;
        sidecars?: false | readonly BlobSidecar<`0x${string}`>[];
        } | {
        accessList?: AccessList;
        authorizationList?: undefined;
        blobs?: readonly `0x${string}`[] | readonly ByteArray[];
        blobVersionedHashes?: readonly `0x${string}`[];
        maxFeePerBlobGas?: bigint;
        maxFeePerGas?: bigint;
        maxPriorityFeePerGas?: bigint;
        sidecars?: false | readonly BlobSidecar<`0x${string}`>[];
        }) & (ExactPartial<FeeValuesEIP4844> & OneOf<    {
        blobs: TransactionSerializableEIP4844["blobs"];
        } | {
        blobVersionedHashes: TransactionSerializableEIP4844["blobVersionedHashes"];
        } | {
        sidecars: TransactionSerializableEIP4844["sidecars"];
        }, TransactionSerializableEIP4844>) ? "eip4844" : never) | (request extends ({
        accessList?: AccessList;
        authorizationList?: SignedAuthorizationList;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: undefined;
        maxFeePerBlobGas?: undefined;
        maxFeePerGas?: bigint;
        maxPriorityFeePerGas?: bigint;
        sidecars?: undefined;
        } | {
        accessList?: AccessList;
        authorizationList?: SignedAuthorizationList;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: undefined;
        maxFeePerBlobGas?: undefined;
        maxFeePerGas?: bigint;
        maxPriorityFeePerGas?: bigint;
        sidecars?: undefined;
        }) & {
        authorizationList: TransactionSerializableEIP7702["authorizationList"];
        } ? "eip7702" : never) | (request["type"] extends string ? Extract<request["type"], string> : never)>) ? T_5 extends "eip2930" ? TransactionRequestEIP2930 : never : never : never) | ((request["type"] extends string ? request["type"] : GetTransactionType<request, (request extends {
        accessList?: undefined;
        authorizationList?: undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: bigint;
        sidecars?: undefined;
        } & FeeValuesLegacy ? "legacy" : never) | (request extends {
        accessList?: AccessList;
        authorizationList?: undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: undefined;
        maxFeePerBlobGas?: undefined;
        maxFeePerGas?: bigint;
        maxPriorityFeePerGas?: bigint;
        sidecars?: undefined;
        } & (OneOf<    {
        maxFeePerGas: FeeValuesEIP1559["maxFeePerGas"];
        } | {
        maxPriorityFeePerGas: FeeValuesEIP1559["maxPriorityFeePerGas"];
        }, FeeValuesEIP1559> & {
        accessList?: TransactionSerializableEIP2930["accessList"] | undefined;
        }) ? "eip1559" : never) | (request extends {
        accessList?: AccessList;
        authorizationList?: undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: bigint;
        sidecars?: undefined;
        maxFeePerBlobGas?: undefined;
        maxFeePerGas?: undefined;
        maxPriorityFeePerGas?: undefined;
        } & {
        accessList: TransactionSerializableEIP2930["accessList"];
        } ? "eip2930" : never) | (request extends ({
        accessList?: AccessList;
        authorizationList?: undefined;
        blobs?: readonly `0x${string}`[] | readonly ByteArray[];
        blobVersionedHashes?: readonly `0x${string}`[];
        maxFeePerBlobGas?: bigint;
        maxFeePerGas?: bigint;
        maxPriorityFeePerGas?: bigint;
        sidecars?: false | readonly BlobSidecar<`0x${string}`>[];
        } | {
        accessList?: AccessList;
        authorizationList?: undefined;
        blobs?: readonly `0x${string}`[] | readonly ByteArray[];
        blobVersionedHashes?: readonly `0x${string}`[];
        maxFeePerBlobGas?: bigint;
        maxFeePerGas?: bigint;
        maxPriorityFeePerGas?: bigint;
        sidecars?: false | readonly BlobSidecar<`0x${string}`>[];
        }) & (ExactPartial<FeeValuesEIP4844> & OneOf<    {
        blobs: TransactionSerializableEIP4844["blobs"];
        } | {
        blobVersionedHashes: TransactionSerializableEIP4844["blobVersionedHashes"];
        } | {
        sidecars: TransactionSerializableEIP4844["sidecars"];
        }, TransactionSerializableEIP4844>) ? "eip4844" : never) | (request extends ({
        accessList?: AccessList;
        authorizationList?: SignedAuthorizationList;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: undefined;
        maxFeePerBlobGas?: undefined;
        maxFeePerGas?: bigint;
        maxPriorityFeePerGas?: bigint;
        sidecars?: undefined;
        } | {
        accessList?: AccessList;
        authorizationList?: SignedAuthorizationList;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: undefined;
        maxFeePerBlobGas?: undefined;
        maxFeePerGas?: bigint;
        maxPriorityFeePerGas?: bigint;
        sidecars?: undefined;
        }) & {
        authorizationList: TransactionSerializableEIP7702["authorizationList"];
        } ? "eip7702" : never) | (request["type"] extends string ? Extract<request["type"], string> : never)> extends "legacy" ? unknown : GetTransactionType<request, (request extends {
        accessList?: undefined;
        authorizationList?: undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: bigint;
        sidecars?: undefined;
        } & FeeValuesLegacy ? "legacy" : never) | (request extends {
        accessList?: AccessList;
        authorizationList?: undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: undefined;
        maxFeePerBlobGas?: undefined;
        maxFeePerGas?: bigint;
        maxPriorityFeePerGas?: bigint;
        sidecars?: undefined;
        } & (OneOf<    {
        maxFeePerGas: FeeValuesEIP1559["maxFeePerGas"];
        } | {
        maxPriorityFeePerGas: FeeValuesEIP1559["maxPriorityFeePerGas"];
        }, FeeValuesEIP1559> & {
        accessList?: TransactionSerializableEIP2930["accessList"] | undefined;
        }) ? "eip1559" : never) | (request extends {
        accessList?: AccessList;
        authorizationList?: undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: bigint;
        sidecars?: undefined;
        maxFeePerBlobGas?: undefined;
        maxFeePerGas?: undefined;
        maxPriorityFeePerGas?: undefined;
        } & {
        accessList: TransactionSerializableEIP2930["accessList"];
        } ? "eip2930" : never) | (request extends ({
        accessList?: AccessList;
        authorizationList?: undefined;
        blobs?: readonly `0x${string}`[] | readonly ByteArray[];
        blobVersionedHashes?: readonly `0x${string}`[];
        maxFeePerBlobGas?: bigint;
        maxFeePerGas?: bigint;
        maxPriorityFeePerGas?: bigint;
        sidecars?: false | readonly BlobSidecar<`0x${string}`>[];
        } | {
        accessList?: AccessList;
        authorizationList?: undefined;
        blobs?: readonly `0x${string}`[] | readonly ByteArray[];
        blobVersionedHashes?: readonly `0x${string}`[];
        maxFeePerBlobGas?: bigint;
        maxFeePerGas?: bigint;
        maxPriorityFeePerGas?: bigint;
        sidecars?: false | readonly BlobSidecar<`0x${string}`>[];
        }) & (ExactPartial<FeeValuesEIP4844> & OneOf<    {
        blobs: TransactionSerializableEIP4844["blobs"];
        } | {
        blobVersionedHashes: TransactionSerializableEIP4844["blobVersionedHashes"];
        } | {
        sidecars: TransactionSerializableEIP4844["sidecars"];
        }, TransactionSerializableEIP4844>) ? "eip4844" : never) | (request extends ({
        accessList?: AccessList;
        authorizationList?: SignedAuthorizationList;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: undefined;
        maxFeePerBlobGas?: undefined;
        maxFeePerGas?: bigint;
        maxPriorityFeePerGas?: bigint;
        sidecars?: undefined;
        } | {
        accessList?: AccessList;
        authorizationList?: SignedAuthorizationList;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: undefined;
        maxFeePerBlobGas?: undefined;
        maxFeePerGas?: bigint;
        maxPriorityFeePerGas?: bigint;
        sidecars?: undefined;
        }) & {
        authorizationList: TransactionSerializableEIP7702["authorizationList"];
        } ? "eip7702" : never) | (request["type"] extends string ? Extract<request["type"], string> : never)>) extends infer T_6 ? T_6 extends (request["type"] extends string ? request["type"] : GetTransactionType<request, (request extends {
        accessList?: undefined;
        authorizationList?: undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: bigint;
        sidecars?: undefined;
        } & FeeValuesLegacy ? "legacy" : never) | (request extends {
        accessList?: AccessList;
        authorizationList?: undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: undefined;
        maxFeePerBlobGas?: undefined;
        maxFeePerGas?: bigint;
        maxPriorityFeePerGas?: bigint;
        sidecars?: undefined;
        } & (OneOf<    {
        maxFeePerGas: FeeValuesEIP1559["maxFeePerGas"];
        } | {
        maxPriorityFeePerGas: FeeValuesEIP1559["maxPriorityFeePerGas"];
        }, FeeValuesEIP1559> & {
        accessList?: TransactionSerializableEIP2930["accessList"] | undefined;
        }) ? "eip1559" : never) | (request extends {
        accessList?: AccessList;
        authorizationList?: undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: bigint;
        sidecars?: undefined;
        maxFeePerBlobGas?: undefined;
        maxFeePerGas?: undefined;
        maxPriorityFeePerGas?: undefined;
        } & {
        accessList: TransactionSerializableEIP2930["accessList"];
        } ? "eip2930" : never) | (request extends ({
        accessList?: AccessList;
        authorizationList?: undefined;
        blobs?: readonly `0x${string}`[] | readonly ByteArray[];
        blobVersionedHashes?: readonly `0x${string}`[];
        maxFeePerBlobGas?: bigint;
        maxFeePerGas?: bigint;
        maxPriorityFeePerGas?: bigint;
        sidecars?: false | readonly BlobSidecar<`0x${string}`>[];
        } | {
        accessList?: AccessList;
        authorizationList?: undefined;
        blobs?: readonly `0x${string}`[] | readonly ByteArray[];
        blobVersionedHashes?: readonly `0x${string}`[];
        maxFeePerBlobGas?: bigint;
        maxFeePerGas?: bigint;
        maxPriorityFeePerGas?: bigint;
        sidecars?: false | readonly BlobSidecar<`0x${string}`>[];
        }) & (ExactPartial<FeeValuesEIP4844> & OneOf<    {
        blobs: TransactionSerializableEIP4844["blobs"];
        } | {
        blobVersionedHashes: TransactionSerializableEIP4844["blobVersionedHashes"];
        } | {
        sidecars: TransactionSerializableEIP4844["sidecars"];
        }, TransactionSerializableEIP4844>) ? "eip4844" : never) | (request extends ({
        accessList?: AccessList;
        authorizationList?: SignedAuthorizationList;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: undefined;
        maxFeePerBlobGas?: undefined;
        maxFeePerGas?: bigint;
        maxPriorityFeePerGas?: bigint;
        sidecars?: undefined;
        } | {
        accessList?: AccessList;
        authorizationList?: SignedAuthorizationList;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: undefined;
        maxFeePerBlobGas?: undefined;
        maxFeePerGas?: bigint;
        maxPriorityFeePerGas?: bigint;
        sidecars?: undefined;
        }) & {
        authorizationList: TransactionSerializableEIP7702["authorizationList"];
        } ? "eip7702" : never) | (request["type"] extends string ? Extract<request["type"], string> : never)> extends "legacy" ? unknown : GetTransactionType<request, (request extends {
        accessList?: undefined;
        authorizationList?: undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: bigint;
        sidecars?: undefined;
        } & FeeValuesLegacy ? "legacy" : never) | (request extends {
        accessList?: AccessList;
        authorizationList?: undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: undefined;
        maxFeePerBlobGas?: undefined;
        maxFeePerGas?: bigint;
        maxPriorityFeePerGas?: bigint;
        sidecars?: undefined;
        } & (OneOf<    {
        maxFeePerGas: FeeValuesEIP1559["maxFeePerGas"];
        } | {
        maxPriorityFeePerGas: FeeValuesEIP1559["maxPriorityFeePerGas"];
        }, FeeValuesEIP1559> & {
        accessList?: TransactionSerializableEIP2930["accessList"] | undefined;
        }) ? "eip1559" : never) | (request extends {
        accessList?: AccessList;
        authorizationList?: undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: bigint;
        sidecars?: undefined;
        maxFeePerBlobGas?: undefined;
        maxFeePerGas?: undefined;
        maxPriorityFeePerGas?: undefined;
        } & {
        accessList: TransactionSerializableEIP2930["accessList"];
        } ? "eip2930" : never) | (request extends ({
        accessList?: AccessList;
        authorizationList?: undefined;
        blobs?: readonly `0x${string}`[] | readonly ByteArray[];
        blobVersionedHashes?: readonly `0x${string}`[];
        maxFeePerBlobGas?: bigint;
        maxFeePerGas?: bigint;
        maxPriorityFeePerGas?: bigint;
        sidecars?: false | readonly BlobSidecar<`0x${string}`>[];
        } | {
        accessList?: AccessList;
        authorizationList?: undefined;
        blobs?: readonly `0x${string}`[] | readonly ByteArray[];
        blobVersionedHashes?: readonly `0x${string}`[];
        maxFeePerBlobGas?: bigint;
        maxFeePerGas?: bigint;
        maxPriorityFeePerGas?: bigint;
        sidecars?: false | readonly BlobSidecar<`0x${string}`>[];
        }) & (ExactPartial<FeeValuesEIP4844> & OneOf<    {
        blobs: TransactionSerializableEIP4844["blobs"];
        } | {
        blobVersionedHashes: TransactionSerializableEIP4844["blobVersionedHashes"];
        } | {
        sidecars: TransactionSerializableEIP4844["sidecars"];
        }, TransactionSerializableEIP4844>) ? "eip4844" : never) | (request extends ({
        accessList?: AccessList;
        authorizationList?: SignedAuthorizationList;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: undefined;
        maxFeePerBlobGas?: undefined;
        maxFeePerGas?: bigint;
        maxPriorityFeePerGas?: bigint;
        sidecars?: undefined;
        } | {
        accessList?: AccessList;
        authorizationList?: SignedAuthorizationList;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: undefined;
        maxFeePerBlobGas?: undefined;
        maxFeePerGas?: bigint;
        maxPriorityFeePerGas?: bigint;
        sidecars?: undefined;
        }) & {
        authorizationList: TransactionSerializableEIP7702["authorizationList"];
        } ? "eip7702" : never) | (request["type"] extends string ? Extract<request["type"], string> : never)>) ? T_6 extends "eip4844" ? TransactionRequestEIP4844 : never : never : never) | ((request["type"] extends string ? request["type"] : GetTransactionType<request, (request extends {
        accessList?: undefined;
        authorizationList?: undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: bigint;
        sidecars?: undefined;
        } & FeeValuesLegacy ? "legacy" : never) | (request extends {
        accessList?: AccessList;
        authorizationList?: undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: undefined;
        maxFeePerBlobGas?: undefined;
        maxFeePerGas?: bigint;
        maxPriorityFeePerGas?: bigint;
        sidecars?: undefined;
        } & (OneOf<    {
        maxFeePerGas: FeeValuesEIP1559["maxFeePerGas"];
        } | {
        maxPriorityFeePerGas: FeeValuesEIP1559["maxPriorityFeePerGas"];
        }, FeeValuesEIP1559> & {
        accessList?: TransactionSerializableEIP2930["accessList"] | undefined;
        }) ? "eip1559" : never) | (request extends {
        accessList?: AccessList;
        authorizationList?: undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: bigint;
        sidecars?: undefined;
        maxFeePerBlobGas?: undefined;
        maxFeePerGas?: undefined;
        maxPriorityFeePerGas?: undefined;
        } & {
        accessList: TransactionSerializableEIP2930["accessList"];
        } ? "eip2930" : never) | (request extends ({
        accessList?: AccessList;
        authorizationList?: undefined;
        blobs?: readonly `0x${string}`[] | readonly ByteArray[];
        blobVersionedHashes?: readonly `0x${string}`[];
        maxFeePerBlobGas?: bigint;
        maxFeePerGas?: bigint;
        maxPriorityFeePerGas?: bigint;
        sidecars?: false | readonly BlobSidecar<`0x${string}`>[];
        } | {
        accessList?: AccessList;
        authorizationList?: undefined;
        blobs?: readonly `0x${string}`[] | readonly ByteArray[];
        blobVersionedHashes?: readonly `0x${string}`[];
        maxFeePerBlobGas?: bigint;
        maxFeePerGas?: bigint;
        maxPriorityFeePerGas?: bigint;
        sidecars?: false | readonly BlobSidecar<`0x${string}`>[];
        }) & (ExactPartial<FeeValuesEIP4844> & OneOf<    {
        blobs: TransactionSerializableEIP4844["blobs"];
        } | {
        blobVersionedHashes: TransactionSerializableEIP4844["blobVersionedHashes"];
        } | {
        sidecars: TransactionSerializableEIP4844["sidecars"];
        }, TransactionSerializableEIP4844>) ? "eip4844" : never) | (request extends ({
        accessList?: AccessList;
        authorizationList?: SignedAuthorizationList;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: undefined;
        maxFeePerBlobGas?: undefined;
        maxFeePerGas?: bigint;
        maxPriorityFeePerGas?: bigint;
        sidecars?: undefined;
        } | {
        accessList?: AccessList;
        authorizationList?: SignedAuthorizationList;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: undefined;
        maxFeePerBlobGas?: undefined;
        maxFeePerGas?: bigint;
        maxPriorityFeePerGas?: bigint;
        sidecars?: undefined;
        }) & {
        authorizationList: TransactionSerializableEIP7702["authorizationList"];
        } ? "eip7702" : never) | (request["type"] extends string ? Extract<request["type"], string> : never)> extends "legacy" ? unknown : GetTransactionType<request, (request extends {
        accessList?: undefined;
        authorizationList?: undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: bigint;
        sidecars?: undefined;
        } & FeeValuesLegacy ? "legacy" : never) | (request extends {
        accessList?: AccessList;
        authorizationList?: undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: undefined;
        maxFeePerBlobGas?: undefined;
        maxFeePerGas?: bigint;
        maxPriorityFeePerGas?: bigint;
        sidecars?: undefined;
        } & (OneOf<    {
        maxFeePerGas: FeeValuesEIP1559["maxFeePerGas"];
        } | {
        maxPriorityFeePerGas: FeeValuesEIP1559["maxPriorityFeePerGas"];
        }, FeeValuesEIP1559> & {
        accessList?: TransactionSerializableEIP2930["accessList"] | undefined;
        }) ? "eip1559" : never) | (request extends {
        accessList?: AccessList;
        authorizationList?: undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: bigint;
        sidecars?: undefined;
        maxFeePerBlobGas?: undefined;
        maxFeePerGas?: undefined;
        maxPriorityFeePerGas?: undefined;
        } & {
        accessList: TransactionSerializableEIP2930["accessList"];
        } ? "eip2930" : never) | (request extends ({
        accessList?: AccessList;
        authorizationList?: undefined;
        blobs?: readonly `0x${string}`[] | readonly ByteArray[];
        blobVersionedHashes?: readonly `0x${string}`[];
        maxFeePerBlobGas?: bigint;
        maxFeePerGas?: bigint;
        maxPriorityFeePerGas?: bigint;
        sidecars?: false | readonly BlobSidecar<`0x${string}`>[];
        } | {
        accessList?: AccessList;
        authorizationList?: undefined;
        blobs?: readonly `0x${string}`[] | readonly ByteArray[];
        blobVersionedHashes?: readonly `0x${string}`[];
        maxFeePerBlobGas?: bigint;
        maxFeePerGas?: bigint;
        maxPriorityFeePerGas?: bigint;
        sidecars?: false | readonly BlobSidecar<`0x${string}`>[];
        }) & (ExactPartial<FeeValuesEIP4844> & OneOf<    {
        blobs: TransactionSerializableEIP4844["blobs"];
        } | {
        blobVersionedHashes: TransactionSerializableEIP4844["blobVersionedHashes"];
        } | {
        sidecars: TransactionSerializableEIP4844["sidecars"];
        }, TransactionSerializableEIP4844>) ? "eip4844" : never) | (request extends ({
        accessList?: AccessList;
        authorizationList?: SignedAuthorizationList;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: undefined;
        maxFeePerBlobGas?: undefined;
        maxFeePerGas?: bigint;
        maxPriorityFeePerGas?: bigint;
        sidecars?: undefined;
        } | {
        accessList?: AccessList;
        authorizationList?: SignedAuthorizationList;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: undefined;
        maxFeePerBlobGas?: undefined;
        maxFeePerGas?: bigint;
        maxPriorityFeePerGas?: bigint;
        sidecars?: undefined;
        }) & {
        authorizationList: TransactionSerializableEIP7702["authorizationList"];
        } ? "eip7702" : never) | (request["type"] extends string ? Extract<request["type"], string> : never)>) extends infer T_7 ? T_7 extends (request["type"] extends string ? request["type"] : GetTransactionType<request, (request extends {
        accessList?: undefined;
        authorizationList?: undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: bigint;
        sidecars?: undefined;
        } & FeeValuesLegacy ? "legacy" : never) | (request extends {
        accessList?: AccessList;
        authorizationList?: undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: undefined;
        maxFeePerBlobGas?: undefined;
        maxFeePerGas?: bigint;
        maxPriorityFeePerGas?: bigint;
        sidecars?: undefined;
        } & (OneOf<    {
        maxFeePerGas: FeeValuesEIP1559["maxFeePerGas"];
        } | {
        maxPriorityFeePerGas: FeeValuesEIP1559["maxPriorityFeePerGas"];
        }, FeeValuesEIP1559> & {
        accessList?: TransactionSerializableEIP2930["accessList"] | undefined;
        }) ? "eip1559" : never) | (request extends {
        accessList?: AccessList;
        authorizationList?: undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: bigint;
        sidecars?: undefined;
        maxFeePerBlobGas?: undefined;
        maxFeePerGas?: undefined;
        maxPriorityFeePerGas?: undefined;
        } & {
        accessList: TransactionSerializableEIP2930["accessList"];
        } ? "eip2930" : never) | (request extends ({
        accessList?: AccessList;
        authorizationList?: undefined;
        blobs?: readonly `0x${string}`[] | readonly ByteArray[];
        blobVersionedHashes?: readonly `0x${string}`[];
        maxFeePerBlobGas?: bigint;
        maxFeePerGas?: bigint;
        maxPriorityFeePerGas?: bigint;
        sidecars?: false | readonly BlobSidecar<`0x${string}`>[];
        } | {
        accessList?: AccessList;
        authorizationList?: undefined;
        blobs?: readonly `0x${string}`[] | readonly ByteArray[];
        blobVersionedHashes?: readonly `0x${string}`[];
        maxFeePerBlobGas?: bigint;
        maxFeePerGas?: bigint;
        maxPriorityFeePerGas?: bigint;
        sidecars?: false | readonly BlobSidecar<`0x${string}`>[];
        }) & (ExactPartial<FeeValuesEIP4844> & OneOf<    {
        blobs: TransactionSerializableEIP4844["blobs"];
        } | {
        blobVersionedHashes: TransactionSerializableEIP4844["blobVersionedHashes"];
        } | {
        sidecars: TransactionSerializableEIP4844["sidecars"];
        }, TransactionSerializableEIP4844>) ? "eip4844" : never) | (request extends ({
        accessList?: AccessList;
        authorizationList?: SignedAuthorizationList;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: undefined;
        maxFeePerBlobGas?: undefined;
        maxFeePerGas?: bigint;
        maxPriorityFeePerGas?: bigint;
        sidecars?: undefined;
        } | {
        accessList?: AccessList;
        authorizationList?: SignedAuthorizationList;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: undefined;
        maxFeePerBlobGas?: undefined;
        maxFeePerGas?: bigint;
        maxPriorityFeePerGas?: bigint;
        sidecars?: undefined;
        }) & {
        authorizationList: TransactionSerializableEIP7702["authorizationList"];
        } ? "eip7702" : never) | (request["type"] extends string ? Extract<request["type"], string> : never)> extends "legacy" ? unknown : GetTransactionType<request, (request extends {
        accessList?: undefined;
        authorizationList?: undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: bigint;
        sidecars?: undefined;
        } & FeeValuesLegacy ? "legacy" : never) | (request extends {
        accessList?: AccessList;
        authorizationList?: undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: undefined;
        maxFeePerBlobGas?: undefined;
        maxFeePerGas?: bigint;
        maxPriorityFeePerGas?: bigint;
        sidecars?: undefined;
        } & (OneOf<    {
        maxFeePerGas: FeeValuesEIP1559["maxFeePerGas"];
        } | {
        maxPriorityFeePerGas: FeeValuesEIP1559["maxPriorityFeePerGas"];
        }, FeeValuesEIP1559> & {
        accessList?: TransactionSerializableEIP2930["accessList"] | undefined;
        }) ? "eip1559" : never) | (request extends {
        accessList?: AccessList;
        authorizationList?: undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: bigint;
        sidecars?: undefined;
        maxFeePerBlobGas?: undefined;
        maxFeePerGas?: undefined;
        maxPriorityFeePerGas?: undefined;
        } & {
        accessList: TransactionSerializableEIP2930["accessList"];
        } ? "eip2930" : never) | (request extends ({
        accessList?: AccessList;
        authorizationList?: undefined;
        blobs?: readonly `0x${string}`[] | readonly ByteArray[];
        blobVersionedHashes?: readonly `0x${string}`[];
        maxFeePerBlobGas?: bigint;
        maxFeePerGas?: bigint;
        maxPriorityFeePerGas?: bigint;
        sidecars?: false | readonly BlobSidecar<`0x${string}`>[];
        } | {
        accessList?: AccessList;
        authorizationList?: undefined;
        blobs?: readonly `0x${string}`[] | readonly ByteArray[];
        blobVersionedHashes?: readonly `0x${string}`[];
        maxFeePerBlobGas?: bigint;
        maxFeePerGas?: bigint;
        maxPriorityFeePerGas?: bigint;
        sidecars?: false | readonly BlobSidecar<`0x${string}`>[];
        }) & (ExactPartial<FeeValuesEIP4844> & OneOf<    {
        blobs: TransactionSerializableEIP4844["blobs"];
        } | {
        blobVersionedHashes: TransactionSerializableEIP4844["blobVersionedHashes"];
        } | {
        sidecars: TransactionSerializableEIP4844["sidecars"];
        }, TransactionSerializableEIP4844>) ? "eip4844" : never) | (request extends ({
        accessList?: AccessList;
        authorizationList?: SignedAuthorizationList;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: undefined;
        maxFeePerBlobGas?: undefined;
        maxFeePerGas?: bigint;
        maxPriorityFeePerGas?: bigint;
        sidecars?: undefined;
        } | {
        accessList?: AccessList;
        authorizationList?: SignedAuthorizationList;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: undefined;
        maxFeePerBlobGas?: undefined;
        maxFeePerGas?: bigint;
        maxPriorityFeePerGas?: bigint;
        sidecars?: undefined;
        }) & {
        authorizationList: TransactionSerializableEIP7702["authorizationList"];
        } ? "eip7702" : never) | (request["type"] extends string ? Extract<request["type"], string> : never)>) ? T_7 extends "eip7702" ? TransactionRequestEIP7702 : never : never : never)>> & {
        chainId?: number | undefined;
        }, (request["parameters"] extends readonly PrepareTransactionRequestParameterType[] ? request["parameters"][number] : "type" | "chainId" | "gas" | "nonce" | "blobVersionedHashes" | "fees") extends infer T_8 ? T_8 extends (request["parameters"] extends readonly PrepareTransactionRequestParameterType[] ? request["parameters"][number] : "type" | "chainId" | "gas" | "nonce" | "blobVersionedHashes" | "fees") ? T_8 extends "fees" ? "gasPrice" | "maxFeePerGas" | "maxPriorityFeePerGas" : T_8 : never : never> & (unknown extends request["kzg"] ? {} : Pick<request, "kzg">) extends infer T ? { [K in keyof T]: T[K]; } : never>;
        requestAddresses: () => Promise<RequestAddressesReturnType>;
        requestPermissions: (args: RequestPermissionsParameters) => Promise<RequestPermissionsReturnType>;
        sendCalls: <const calls extends readonly unknown[], chainOverride extends Chain | undefined = undefined>(parameters: SendCallsParameters<any, any, chainOverride, calls>) => Promise<{
            capabilities?: {
                [x: string]: any;
            };
            id: string;
        }>;
        sendCallsSync: <const calls extends readonly unknown[], chainOverride extends Chain | undefined = undefined>(parameters: SendCallsSyncParameters<any, any, chainOverride, calls>) => Promise<{
            atomic: boolean;
            capabilities?: {
                [key: string]: any;
            } | {
                [x: string]: any;
            };
            chainId: number;
            id: string;
            receipts?: WalletCallReceipt<bigint, "success" | "reverted">[];
            version: string;
            statusCode: number;
            status: "pending" | "success" | "failure" | undefined;
        }>;
        sendRawTransaction: (args: SendRawTransactionParameters) => Promise<SendRawTransactionReturnType>;
        sendRawTransactionSync: (args: SendRawTransactionSyncParameters) => Promise<any>;
        sendTransaction: <const request extends SendTransactionRequest<any, chainOverride>, chainOverride extends Chain | undefined = undefined>(args: SendTransactionParameters<any, any, chainOverride, request>) => Promise<SendTransactionReturnType>;
        sendTransactionSync: <const request extends SendTransactionSyncRequest<any, chainOverride>, chainOverride extends Chain | undefined = undefined>(args: SendTransactionSyncParameters<any, any, chainOverride, request>) => Promise<SendTransactionSyncReturnType>;
        showCallsStatus: (parameters: ShowCallsStatusParameters) => Promise<ShowCallsStatusReturnType>;
        signAuthorization: (parameters: SignAuthorizationParameters<any>) => Promise<SignAuthorizationReturnType>;
        signMessage: (args: SignMessageParameters<any>) => Promise<SignMessageReturnType>;
        signTransaction: <chainOverride extends Chain | undefined, const request extends UnionOmit<ExtractChainFormatterParameters<DeriveChain<any, chainOverride>, "transactionRequest", TransactionRequest>, "from"> = UnionOmit<ExtractChainFormatterParameters<DeriveChain<any, chainOverride>, "transactionRequest", TransactionRequest>, "from">>(args: SignTransactionParameters<any, any, chainOverride, request>) => Promise<TransactionSerialized<GetTransactionType<request, (request extends {
        accessList?: undefined;
        authorizationList?: undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: bigint;
        sidecars?: undefined;
        } & FeeValuesLegacy ? "legacy" : never) | (request extends {
        accessList?: AccessList;
        authorizationList?: undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: undefined;
        maxFeePerBlobGas?: undefined;
        maxFeePerGas?: bigint;
        maxPriorityFeePerGas?: bigint;
        sidecars?: undefined;
        } & (OneOf<    {
        maxFeePerGas: FeeValuesEIP1559["maxFeePerGas"];
        } | {
        maxPriorityFeePerGas: FeeValuesEIP1559["maxPriorityFeePerGas"];
        }, FeeValuesEIP1559> & {
        accessList?: TransactionSerializableEIP2930["accessList"] | undefined;
        }) ? "eip1559" : never) | (request extends {
        accessList?: AccessList;
        authorizationList?: undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: bigint;
        sidecars?: undefined;
        maxFeePerBlobGas?: undefined;
        maxFeePerGas?: undefined;
        maxPriorityFeePerGas?: undefined;
        } & {
        accessList: TransactionSerializableEIP2930["accessList"];
        } ? "eip2930" : never) | (request extends ({
        accessList?: AccessList;
        authorizationList?: undefined;
        blobs?: readonly `0x${string}`[] | readonly ByteArray[];
        blobVersionedHashes?: readonly `0x${string}`[];
        maxFeePerBlobGas?: bigint;
        maxFeePerGas?: bigint;
        maxPriorityFeePerGas?: bigint;
        sidecars?: false | readonly BlobSidecar<`0x${string}`>[];
        } | {
        accessList?: AccessList;
        authorizationList?: undefined;
        blobs?: readonly `0x${string}`[] | readonly ByteArray[];
        blobVersionedHashes?: readonly `0x${string}`[];
        maxFeePerBlobGas?: bigint;
        maxFeePerGas?: bigint;
        maxPriorityFeePerGas?: bigint;
        sidecars?: false | readonly BlobSidecar<`0x${string}`>[];
        }) & (ExactPartial<FeeValuesEIP4844> & OneOf<    {
        blobs: TransactionSerializableEIP4844["blobs"];
        } | {
        blobVersionedHashes: TransactionSerializableEIP4844["blobVersionedHashes"];
        } | {
        sidecars: TransactionSerializableEIP4844["sidecars"];
        }, TransactionSerializableEIP4844>) ? "eip4844" : never) | (request extends ({
        accessList?: AccessList;
        authorizationList?: SignedAuthorizationList;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: undefined;
        maxFeePerBlobGas?: undefined;
        maxFeePerGas?: bigint;
        maxPriorityFeePerGas?: bigint;
        sidecars?: undefined;
        } | {
        accessList?: AccessList;
        authorizationList?: SignedAuthorizationList;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: undefined;
        maxFeePerBlobGas?: undefined;
        maxFeePerGas?: bigint;
        maxPriorityFeePerGas?: bigint;
        sidecars?: undefined;
        }) & {
        authorizationList: TransactionSerializableEIP7702["authorizationList"];
        } ? "eip7702" : never) | (request["type"] extends string ? Extract<request["type"], string> : never)>, (GetTransactionType<request, (request extends {
        accessList?: undefined;
        authorizationList?: undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: bigint;
        sidecars?: undefined;
        } & FeeValuesLegacy ? "legacy" : never) | (request extends {
        accessList?: AccessList;
        authorizationList?: undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: undefined;
        maxFeePerBlobGas?: undefined;
        maxFeePerGas?: bigint;
        maxPriorityFeePerGas?: bigint;
        sidecars?: undefined;
        } & (OneOf<    {
        maxFeePerGas: FeeValuesEIP1559["maxFeePerGas"];
        } | {
        maxPriorityFeePerGas: FeeValuesEIP1559["maxPriorityFeePerGas"];
        }, FeeValuesEIP1559> & {
        accessList?: TransactionSerializableEIP2930["accessList"] | undefined;
        }) ? "eip1559" : never) | (request extends {
        accessList?: AccessList;
        authorizationList?: undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: bigint;
        sidecars?: undefined;
        maxFeePerBlobGas?: undefined;
        maxFeePerGas?: undefined;
        maxPriorityFeePerGas?: undefined;
        } & {
        accessList: TransactionSerializableEIP2930["accessList"];
        } ? "eip2930" : never) | (request extends ({
        accessList?: AccessList;
        authorizationList?: undefined;
        blobs?: readonly `0x${string}`[] | readonly ByteArray[];
        blobVersionedHashes?: readonly `0x${string}`[];
        maxFeePerBlobGas?: bigint;
        maxFeePerGas?: bigint;
        maxPriorityFeePerGas?: bigint;
        sidecars?: false | readonly BlobSidecar<`0x${string}`>[];
        } | {
        accessList?: AccessList;
        authorizationList?: undefined;
        blobs?: readonly `0x${string}`[] | readonly ByteArray[];
        blobVersionedHashes?: readonly `0x${string}`[];
        maxFeePerBlobGas?: bigint;
        maxFeePerGas?: bigint;
        maxPriorityFeePerGas?: bigint;
        sidecars?: false | readonly BlobSidecar<`0x${string}`>[];
        }) & (ExactPartial<FeeValuesEIP4844> & OneOf<    {
        blobs: TransactionSerializableEIP4844["blobs"];
        } | {
        blobVersionedHashes: TransactionSerializableEIP4844["blobVersionedHashes"];
        } | {
        sidecars: TransactionSerializableEIP4844["sidecars"];
        }, TransactionSerializableEIP4844>) ? "eip4844" : never) | (request extends ({
        accessList?: AccessList;
        authorizationList?: SignedAuthorizationList;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: undefined;
        maxFeePerBlobGas?: undefined;
        maxFeePerGas?: bigint;
        maxPriorityFeePerGas?: bigint;
        sidecars?: undefined;
        } | {
        accessList?: AccessList;
        authorizationList?: SignedAuthorizationList;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: undefined;
        maxFeePerBlobGas?: undefined;
        maxFeePerGas?: bigint;
        maxPriorityFeePerGas?: bigint;
        sidecars?: undefined;
        }) & {
        authorizationList: TransactionSerializableEIP7702["authorizationList"];
        } ? "eip7702" : never) | (request["type"] extends string ? Extract<request["type"], string> : never)> extends infer T ? T extends GetTransactionType<request, (request extends {
        accessList?: undefined;
        authorizationList?: undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: bigint;
        sidecars?: undefined;
        } & FeeValuesLegacy ? "legacy" : never) | (request extends {
        accessList?: AccessList;
        authorizationList?: undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: undefined;
        maxFeePerBlobGas?: undefined;
        maxFeePerGas?: bigint;
        maxPriorityFeePerGas?: bigint;
        sidecars?: undefined;
        } & (OneOf<    {
        maxFeePerGas: FeeValuesEIP1559["maxFeePerGas"];
        } | {
        maxPriorityFeePerGas: FeeValuesEIP1559["maxPriorityFeePerGas"];
        }, FeeValuesEIP1559> & {
        accessList?: TransactionSerializableEIP2930["accessList"] | undefined;
        }) ? "eip1559" : never) | (request extends {
        accessList?: AccessList;
        authorizationList?: undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: bigint;
        sidecars?: undefined;
        maxFeePerBlobGas?: undefined;
        maxFeePerGas?: undefined;
        maxPriorityFeePerGas?: undefined;
        } & {
        accessList: TransactionSerializableEIP2930["accessList"];
        } ? "eip2930" : never) | (request extends ({
        accessList?: AccessList;
        authorizationList?: undefined;
        blobs?: readonly `0x${string}`[] | readonly ByteArray[];
        blobVersionedHashes?: readonly `0x${string}`[];
        maxFeePerBlobGas?: bigint;
        maxFeePerGas?: bigint;
        maxPriorityFeePerGas?: bigint;
        sidecars?: false | readonly BlobSidecar<`0x${string}`>[];
        } | {
        accessList?: AccessList;
        authorizationList?: undefined;
        blobs?: readonly `0x${string}`[] | readonly ByteArray[];
        blobVersionedHashes?: readonly `0x${string}`[];
        maxFeePerBlobGas?: bigint;
        maxFeePerGas?: bigint;
        maxPriorityFeePerGas?: bigint;
        sidecars?: false | readonly BlobSidecar<`0x${string}`>[];
        }) & (ExactPartial<FeeValuesEIP4844> & OneOf<    {
        blobs: TransactionSerializableEIP4844["blobs"];
        } | {
        blobVersionedHashes: TransactionSerializableEIP4844["blobVersionedHashes"];
        } | {
        sidecars: TransactionSerializableEIP4844["sidecars"];
        }, TransactionSerializableEIP4844>) ? "eip4844" : never) | (request extends ({
        accessList?: AccessList;
        authorizationList?: SignedAuthorizationList;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: undefined;
        maxFeePerBlobGas?: undefined;
        maxFeePerGas?: bigint;
        maxPriorityFeePerGas?: bigint;
        sidecars?: undefined;
        } | {
        accessList?: AccessList;
        authorizationList?: SignedAuthorizationList;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: undefined;
        maxFeePerBlobGas?: undefined;
        maxFeePerGas?: bigint;
        maxPriorityFeePerGas?: bigint;
        sidecars?: undefined;
        }) & {
        authorizationList: TransactionSerializableEIP7702["authorizationList"];
        } ? "eip7702" : never) | (request["type"] extends string ? Extract<request["type"], string> : never)> ? T extends "eip1559" ? `0x02${string}` : never : never : never) | (GetTransactionType<request, (request extends {
        accessList?: undefined;
        authorizationList?: undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: bigint;
        sidecars?: undefined;
        } & FeeValuesLegacy ? "legacy" : never) | (request extends {
        accessList?: AccessList;
        authorizationList?: undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: undefined;
        maxFeePerBlobGas?: undefined;
        maxFeePerGas?: bigint;
        maxPriorityFeePerGas?: bigint;
        sidecars?: undefined;
        } & (OneOf<    {
        maxFeePerGas: FeeValuesEIP1559["maxFeePerGas"];
        } | {
        maxPriorityFeePerGas: FeeValuesEIP1559["maxPriorityFeePerGas"];
        }, FeeValuesEIP1559> & {
        accessList?: TransactionSerializableEIP2930["accessList"] | undefined;
        }) ? "eip1559" : never) | (request extends {
        accessList?: AccessList;
        authorizationList?: undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: bigint;
        sidecars?: undefined;
        maxFeePerBlobGas?: undefined;
        maxFeePerGas?: undefined;
        maxPriorityFeePerGas?: undefined;
        } & {
        accessList: TransactionSerializableEIP2930["accessList"];
        } ? "eip2930" : never) | (request extends ({
        accessList?: AccessList;
        authorizationList?: undefined;
        blobs?: readonly `0x${string}`[] | readonly ByteArray[];
        blobVersionedHashes?: readonly `0x${string}`[];
        maxFeePerBlobGas?: bigint;
        maxFeePerGas?: bigint;
        maxPriorityFeePerGas?: bigint;
        sidecars?: false | readonly BlobSidecar<`0x${string}`>[];
        } | {
        accessList?: AccessList;
        authorizationList?: undefined;
        blobs?: readonly `0x${string}`[] | readonly ByteArray[];
        blobVersionedHashes?: readonly `0x${string}`[];
        maxFeePerBlobGas?: bigint;
        maxFeePerGas?: bigint;
        maxPriorityFeePerGas?: bigint;
        sidecars?: false | readonly BlobSidecar<`0x${string}`>[];
        }) & (ExactPartial<FeeValuesEIP4844> & OneOf<    {
        blobs: TransactionSerializableEIP4844["blobs"];
        } | {
        blobVersionedHashes: TransactionSerializableEIP4844["blobVersionedHashes"];
        } | {
        sidecars: TransactionSerializableEIP4844["sidecars"];
        }, TransactionSerializableEIP4844>) ? "eip4844" : never) | (request extends ({
        accessList?: AccessList;
        authorizationList?: SignedAuthorizationList;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: undefined;
        maxFeePerBlobGas?: undefined;
        maxFeePerGas?: bigint;
        maxPriorityFeePerGas?: bigint;
        sidecars?: undefined;
        } | {
        accessList?: AccessList;
        authorizationList?: SignedAuthorizationList;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: undefined;
        maxFeePerBlobGas?: undefined;
        maxFeePerGas?: bigint;
        maxPriorityFeePerGas?: bigint;
        sidecars?: undefined;
        }) & {
        authorizationList: TransactionSerializableEIP7702["authorizationList"];
        } ? "eip7702" : never) | (request["type"] extends string ? Extract<request["type"], string> : never)> extends infer T_1 ? T_1 extends GetTransactionType<request, (request extends {
        accessList?: undefined;
        authorizationList?: undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: bigint;
        sidecars?: undefined;
        } & FeeValuesLegacy ? "legacy" : never) | (request extends {
        accessList?: AccessList;
        authorizationList?: undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: undefined;
        maxFeePerBlobGas?: undefined;
        maxFeePerGas?: bigint;
        maxPriorityFeePerGas?: bigint;
        sidecars?: undefined;
        } & (OneOf<    {
        maxFeePerGas: FeeValuesEIP1559["maxFeePerGas"];
        } | {
        maxPriorityFeePerGas: FeeValuesEIP1559["maxPriorityFeePerGas"];
        }, FeeValuesEIP1559> & {
        accessList?: TransactionSerializableEIP2930["accessList"] | undefined;
        }) ? "eip1559" : never) | (request extends {
        accessList?: AccessList;
        authorizationList?: undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: bigint;
        sidecars?: undefined;
        maxFeePerBlobGas?: undefined;
        maxFeePerGas?: undefined;
        maxPriorityFeePerGas?: undefined;
        } & {
        accessList: TransactionSerializableEIP2930["accessList"];
        } ? "eip2930" : never) | (request extends ({
        accessList?: AccessList;
        authorizationList?: undefined;
        blobs?: readonly `0x${string}`[] | readonly ByteArray[];
        blobVersionedHashes?: readonly `0x${string}`[];
        maxFeePerBlobGas?: bigint;
        maxFeePerGas?: bigint;
        maxPriorityFeePerGas?: bigint;
        sidecars?: false | readonly BlobSidecar<`0x${string}`>[];
        } | {
        accessList?: AccessList;
        authorizationList?: undefined;
        blobs?: readonly `0x${string}`[] | readonly ByteArray[];
        blobVersionedHashes?: readonly `0x${string}`[];
        maxFeePerBlobGas?: bigint;
        maxFeePerGas?: bigint;
        maxPriorityFeePerGas?: bigint;
        sidecars?: false | readonly BlobSidecar<`0x${string}`>[];
        }) & (ExactPartial<FeeValuesEIP4844> & OneOf<    {
        blobs: TransactionSerializableEIP4844["blobs"];
        } | {
        blobVersionedHashes: TransactionSerializableEIP4844["blobVersionedHashes"];
        } | {
        sidecars: TransactionSerializableEIP4844["sidecars"];
        }, TransactionSerializableEIP4844>) ? "eip4844" : never) | (request extends ({
        accessList?: AccessList;
        authorizationList?: SignedAuthorizationList;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: undefined;
        maxFeePerBlobGas?: undefined;
        maxFeePerGas?: bigint;
        maxPriorityFeePerGas?: bigint;
        sidecars?: undefined;
        } | {
        accessList?: AccessList;
        authorizationList?: SignedAuthorizationList;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: undefined;
        maxFeePerBlobGas?: undefined;
        maxFeePerGas?: bigint;
        maxPriorityFeePerGas?: bigint;
        sidecars?: undefined;
        }) & {
        authorizationList: TransactionSerializableEIP7702["authorizationList"];
        } ? "eip7702" : never) | (request["type"] extends string ? Extract<request["type"], string> : never)> ? T_1 extends "eip2930" ? `0x01${string}` : never : never : never) | (GetTransactionType<request, (request extends {
        accessList?: undefined;
        authorizationList?: undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: bigint;
        sidecars?: undefined;
        } & FeeValuesLegacy ? "legacy" : never) | (request extends {
        accessList?: AccessList;
        authorizationList?: undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: undefined;
        maxFeePerBlobGas?: undefined;
        maxFeePerGas?: bigint;
        maxPriorityFeePerGas?: bigint;
        sidecars?: undefined;
        } & (OneOf<    {
        maxFeePerGas: FeeValuesEIP1559["maxFeePerGas"];
        } | {
        maxPriorityFeePerGas: FeeValuesEIP1559["maxPriorityFeePerGas"];
        }, FeeValuesEIP1559> & {
        accessList?: TransactionSerializableEIP2930["accessList"] | undefined;
        }) ? "eip1559" : never) | (request extends {
        accessList?: AccessList;
        authorizationList?: undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: bigint;
        sidecars?: undefined;
        maxFeePerBlobGas?: undefined;
        maxFeePerGas?: undefined;
        maxPriorityFeePerGas?: undefined;
        } & {
        accessList: TransactionSerializableEIP2930["accessList"];
        } ? "eip2930" : never) | (request extends ({
        accessList?: AccessList;
        authorizationList?: undefined;
        blobs?: readonly `0x${string}`[] | readonly ByteArray[];
        blobVersionedHashes?: readonly `0x${string}`[];
        maxFeePerBlobGas?: bigint;
        maxFeePerGas?: bigint;
        maxPriorityFeePerGas?: bigint;
        sidecars?: false | readonly BlobSidecar<`0x${string}`>[];
        } | {
        accessList?: AccessList;
        authorizationList?: undefined;
        blobs?: readonly `0x${string}`[] | readonly ByteArray[];
        blobVersionedHashes?: readonly `0x${string}`[];
        maxFeePerBlobGas?: bigint;
        maxFeePerGas?: bigint;
        maxPriorityFeePerGas?: bigint;
        sidecars?: false | readonly BlobSidecar<`0x${string}`>[];
        }) & (ExactPartial<FeeValuesEIP4844> & OneOf<    {
        blobs: TransactionSerializableEIP4844["blobs"];
        } | {
        blobVersionedHashes: TransactionSerializableEIP4844["blobVersionedHashes"];
        } | {
        sidecars: TransactionSerializableEIP4844["sidecars"];
        }, TransactionSerializableEIP4844>) ? "eip4844" : never) | (request extends ({
        accessList?: AccessList;
        authorizationList?: SignedAuthorizationList;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: undefined;
        maxFeePerBlobGas?: undefined;
        maxFeePerGas?: bigint;
        maxPriorityFeePerGas?: bigint;
        sidecars?: undefined;
        } | {
        accessList?: AccessList;
        authorizationList?: SignedAuthorizationList;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: undefined;
        maxFeePerBlobGas?: undefined;
        maxFeePerGas?: bigint;
        maxPriorityFeePerGas?: bigint;
        sidecars?: undefined;
        }) & {
        authorizationList: TransactionSerializableEIP7702["authorizationList"];
        } ? "eip7702" : never) | (request["type"] extends string ? Extract<request["type"], string> : never)> extends infer T_2 ? T_2 extends GetTransactionType<request, (request extends {
        accessList?: undefined;
        authorizationList?: undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: bigint;
        sidecars?: undefined;
        } & FeeValuesLegacy ? "legacy" : never) | (request extends {
        accessList?: AccessList;
        authorizationList?: undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: undefined;
        maxFeePerBlobGas?: undefined;
        maxFeePerGas?: bigint;
        maxPriorityFeePerGas?: bigint;
        sidecars?: undefined;
        } & (OneOf<    {
        maxFeePerGas: FeeValuesEIP1559["maxFeePerGas"];
        } | {
        maxPriorityFeePerGas: FeeValuesEIP1559["maxPriorityFeePerGas"];
        }, FeeValuesEIP1559> & {
        accessList?: TransactionSerializableEIP2930["accessList"] | undefined;
        }) ? "eip1559" : never) | (request extends {
        accessList?: AccessList;
        authorizationList?: undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: bigint;
        sidecars?: undefined;
        maxFeePerBlobGas?: undefined;
        maxFeePerGas?: undefined;
        maxPriorityFeePerGas?: undefined;
        } & {
        accessList: TransactionSerializableEIP2930["accessList"];
        } ? "eip2930" : never) | (request extends ({
        accessList?: AccessList;
        authorizationList?: undefined;
        blobs?: readonly `0x${string}`[] | readonly ByteArray[];
        blobVersionedHashes?: readonly `0x${string}`[];
        maxFeePerBlobGas?: bigint;
        maxFeePerGas?: bigint;
        maxPriorityFeePerGas?: bigint;
        sidecars?: false | readonly BlobSidecar<`0x${string}`>[];
        } | {
        accessList?: AccessList;
        authorizationList?: undefined;
        blobs?: readonly `0x${string}`[] | readonly ByteArray[];
        blobVersionedHashes?: readonly `0x${string}`[];
        maxFeePerBlobGas?: bigint;
        maxFeePerGas?: bigint;
        maxPriorityFeePerGas?: bigint;
        sidecars?: false | readonly BlobSidecar<`0x${string}`>[];
        }) & (ExactPartial<FeeValuesEIP4844> & OneOf<    {
        blobs: TransactionSerializableEIP4844["blobs"];
        } | {
        blobVersionedHashes: TransactionSerializableEIP4844["blobVersionedHashes"];
        } | {
        sidecars: TransactionSerializableEIP4844["sidecars"];
        }, TransactionSerializableEIP4844>) ? "eip4844" : never) | (request extends ({
        accessList?: AccessList;
        authorizationList?: SignedAuthorizationList;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: undefined;
        maxFeePerBlobGas?: undefined;
        maxFeePerGas?: bigint;
        maxPriorityFeePerGas?: bigint;
        sidecars?: undefined;
        } | {
        accessList?: AccessList;
        authorizationList?: SignedAuthorizationList;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: undefined;
        maxFeePerBlobGas?: undefined;
        maxFeePerGas?: bigint;
        maxPriorityFeePerGas?: bigint;
        sidecars?: undefined;
        }) & {
        authorizationList: TransactionSerializableEIP7702["authorizationList"];
        } ? "eip7702" : never) | (request["type"] extends string ? Extract<request["type"], string> : never)> ? T_2 extends "eip4844" ? `0x03${string}` : never : never : never) | (GetTransactionType<request, (request extends {
        accessList?: undefined;
        authorizationList?: undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: bigint;
        sidecars?: undefined;
        } & FeeValuesLegacy ? "legacy" : never) | (request extends {
        accessList?: AccessList;
        authorizationList?: undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: undefined;
        maxFeePerBlobGas?: undefined;
        maxFeePerGas?: bigint;
        maxPriorityFeePerGas?: bigint;
        sidecars?: undefined;
        } & (OneOf<    {
        maxFeePerGas: FeeValuesEIP1559["maxFeePerGas"];
        } | {
        maxPriorityFeePerGas: FeeValuesEIP1559["maxPriorityFeePerGas"];
        }, FeeValuesEIP1559> & {
        accessList?: TransactionSerializableEIP2930["accessList"] | undefined;
        }) ? "eip1559" : never) | (request extends {
        accessList?: AccessList;
        authorizationList?: undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: bigint;
        sidecars?: undefined;
        maxFeePerBlobGas?: undefined;
        maxFeePerGas?: undefined;
        maxPriorityFeePerGas?: undefined;
        } & {
        accessList: TransactionSerializableEIP2930["accessList"];
        } ? "eip2930" : never) | (request extends ({
        accessList?: AccessList;
        authorizationList?: undefined;
        blobs?: readonly `0x${string}`[] | readonly ByteArray[];
        blobVersionedHashes?: readonly `0x${string}`[];
        maxFeePerBlobGas?: bigint;
        maxFeePerGas?: bigint;
        maxPriorityFeePerGas?: bigint;
        sidecars?: false | readonly BlobSidecar<`0x${string}`>[];
        } | {
        accessList?: AccessList;
        authorizationList?: undefined;
        blobs?: readonly `0x${string}`[] | readonly ByteArray[];
        blobVersionedHashes?: readonly `0x${string}`[];
        maxFeePerBlobGas?: bigint;
        maxFeePerGas?: bigint;
        maxPriorityFeePerGas?: bigint;
        sidecars?: false | readonly BlobSidecar<`0x${string}`>[];
        }) & (ExactPartial<FeeValuesEIP4844> & OneOf<    {
        blobs: TransactionSerializableEIP4844["blobs"];
        } | {
        blobVersionedHashes: TransactionSerializableEIP4844["blobVersionedHashes"];
        } | {
        sidecars: TransactionSerializableEIP4844["sidecars"];
        }, TransactionSerializableEIP4844>) ? "eip4844" : never) | (request extends ({
        accessList?: AccessList;
        authorizationList?: SignedAuthorizationList;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: undefined;
        maxFeePerBlobGas?: undefined;
        maxFeePerGas?: bigint;
        maxPriorityFeePerGas?: bigint;
        sidecars?: undefined;
        } | {
        accessList?: AccessList;
        authorizationList?: SignedAuthorizationList;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: undefined;
        maxFeePerBlobGas?: undefined;
        maxFeePerGas?: bigint;
        maxPriorityFeePerGas?: bigint;
        sidecars?: undefined;
        }) & {
        authorizationList: TransactionSerializableEIP7702["authorizationList"];
        } ? "eip7702" : never) | (request["type"] extends string ? Extract<request["type"], string> : never)> extends infer T_3 ? T_3 extends GetTransactionType<request, (request extends {
        accessList?: undefined;
        authorizationList?: undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: bigint;
        sidecars?: undefined;
        } & FeeValuesLegacy ? "legacy" : never) | (request extends {
        accessList?: AccessList;
        authorizationList?: undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: undefined;
        maxFeePerBlobGas?: undefined;
        maxFeePerGas?: bigint;
        maxPriorityFeePerGas?: bigint;
        sidecars?: undefined;
        } & (OneOf<    {
        maxFeePerGas: FeeValuesEIP1559["maxFeePerGas"];
        } | {
        maxPriorityFeePerGas: FeeValuesEIP1559["maxPriorityFeePerGas"];
        }, FeeValuesEIP1559> & {
        accessList?: TransactionSerializableEIP2930["accessList"] | undefined;
        }) ? "eip1559" : never) | (request extends {
        accessList?: AccessList;
        authorizationList?: undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: bigint;
        sidecars?: undefined;
        maxFeePerBlobGas?: undefined;
        maxFeePerGas?: undefined;
        maxPriorityFeePerGas?: undefined;
        } & {
        accessList: TransactionSerializableEIP2930["accessList"];
        } ? "eip2930" : never) | (request extends ({
        accessList?: AccessList;
        authorizationList?: undefined;
        blobs?: readonly `0x${string}`[] | readonly ByteArray[];
        blobVersionedHashes?: readonly `0x${string}`[];
        maxFeePerBlobGas?: bigint;
        maxFeePerGas?: bigint;
        maxPriorityFeePerGas?: bigint;
        sidecars?: false | readonly BlobSidecar<`0x${string}`>[];
        } | {
        accessList?: AccessList;
        authorizationList?: undefined;
        blobs?: readonly `0x${string}`[] | readonly ByteArray[];
        blobVersionedHashes?: readonly `0x${string}`[];
        maxFeePerBlobGas?: bigint;
        maxFeePerGas?: bigint;
        maxPriorityFeePerGas?: bigint;
        sidecars?: false | readonly BlobSidecar<`0x${string}`>[];
        }) & (ExactPartial<FeeValuesEIP4844> & OneOf<    {
        blobs: TransactionSerializableEIP4844["blobs"];
        } | {
        blobVersionedHashes: TransactionSerializableEIP4844["blobVersionedHashes"];
        } | {
        sidecars: TransactionSerializableEIP4844["sidecars"];
        }, TransactionSerializableEIP4844>) ? "eip4844" : never) | (request extends ({
        accessList?: AccessList;
        authorizationList?: SignedAuthorizationList;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: undefined;
        maxFeePerBlobGas?: undefined;
        maxFeePerGas?: bigint;
        maxPriorityFeePerGas?: bigint;
        sidecars?: undefined;
        } | {
        accessList?: AccessList;
        authorizationList?: SignedAuthorizationList;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: undefined;
        maxFeePerBlobGas?: undefined;
        maxFeePerGas?: bigint;
        maxPriorityFeePerGas?: bigint;
        sidecars?: undefined;
        }) & {
        authorizationList: TransactionSerializableEIP7702["authorizationList"];
        } ? "eip7702" : never) | (request["type"] extends string ? Extract<request["type"], string> : never)> ? T_3 extends "eip7702" ? `0x04${string}` : never : never : never) | (GetTransactionType<request, (request extends {
        accessList?: undefined;
        authorizationList?: undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: bigint;
        sidecars?: undefined;
        } & FeeValuesLegacy ? "legacy" : never) | (request extends {
        accessList?: AccessList;
        authorizationList?: undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: undefined;
        maxFeePerBlobGas?: undefined;
        maxFeePerGas?: bigint;
        maxPriorityFeePerGas?: bigint;
        sidecars?: undefined;
        } & (OneOf<    {
        maxFeePerGas: FeeValuesEIP1559["maxFeePerGas"];
        } | {
        maxPriorityFeePerGas: FeeValuesEIP1559["maxPriorityFeePerGas"];
        }, FeeValuesEIP1559> & {
        accessList?: TransactionSerializableEIP2930["accessList"] | undefined;
        }) ? "eip1559" : never) | (request extends {
        accessList?: AccessList;
        authorizationList?: undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: bigint;
        sidecars?: undefined;
        maxFeePerBlobGas?: undefined;
        maxFeePerGas?: undefined;
        maxPriorityFeePerGas?: undefined;
        } & {
        accessList: TransactionSerializableEIP2930["accessList"];
        } ? "eip2930" : never) | (request extends ({
        accessList?: AccessList;
        authorizationList?: undefined;
        blobs?: readonly `0x${string}`[] | readonly ByteArray[];
        blobVersionedHashes?: readonly `0x${string}`[];
        maxFeePerBlobGas?: bigint;
        maxFeePerGas?: bigint;
        maxPriorityFeePerGas?: bigint;
        sidecars?: false | readonly BlobSidecar<`0x${string}`>[];
        } | {
        accessList?: AccessList;
        authorizationList?: undefined;
        blobs?: readonly `0x${string}`[] | readonly ByteArray[];
        blobVersionedHashes?: readonly `0x${string}`[];
        maxFeePerBlobGas?: bigint;
        maxFeePerGas?: bigint;
        maxPriorityFeePerGas?: bigint;
        sidecars?: false | readonly BlobSidecar<`0x${string}`>[];
        }) & (ExactPartial<FeeValuesEIP4844> & OneOf<    {
        blobs: TransactionSerializableEIP4844["blobs"];
        } | {
        blobVersionedHashes: TransactionSerializableEIP4844["blobVersionedHashes"];
        } | {
        sidecars: TransactionSerializableEIP4844["sidecars"];
        }, TransactionSerializableEIP4844>) ? "eip4844" : never) | (request extends ({
        accessList?: AccessList;
        authorizationList?: SignedAuthorizationList;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: undefined;
        maxFeePerBlobGas?: undefined;
        maxFeePerGas?: bigint;
        maxPriorityFeePerGas?: bigint;
        sidecars?: undefined;
        } | {
        accessList?: AccessList;
        authorizationList?: SignedAuthorizationList;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: undefined;
        maxFeePerBlobGas?: undefined;
        maxFeePerGas?: bigint;
        maxPriorityFeePerGas?: bigint;
        sidecars?: undefined;
        }) & {
        authorizationList: TransactionSerializableEIP7702["authorizationList"];
        } ? "eip7702" : never) | (request["type"] extends string ? Extract<request["type"], string> : never)> extends infer T_4 ? T_4 extends GetTransactionType<request, (request extends {
        accessList?: undefined;
        authorizationList?: undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: bigint;
        sidecars?: undefined;
        } & FeeValuesLegacy ? "legacy" : never) | (request extends {
        accessList?: AccessList;
        authorizationList?: undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: undefined;
        maxFeePerBlobGas?: undefined;
        maxFeePerGas?: bigint;
        maxPriorityFeePerGas?: bigint;
        sidecars?: undefined;
        } & (OneOf<    {
        maxFeePerGas: FeeValuesEIP1559["maxFeePerGas"];
        } | {
        maxPriorityFeePerGas: FeeValuesEIP1559["maxPriorityFeePerGas"];
        }, FeeValuesEIP1559> & {
        accessList?: TransactionSerializableEIP2930["accessList"] | undefined;
        }) ? "eip1559" : never) | (request extends {
        accessList?: AccessList;
        authorizationList?: undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: bigint;
        sidecars?: undefined;
        maxFeePerBlobGas?: undefined;
        maxFeePerGas?: undefined;
        maxPriorityFeePerGas?: undefined;
        } & {
        accessList: TransactionSerializableEIP2930["accessList"];
        } ? "eip2930" : never) | (request extends ({
        accessList?: AccessList;
        authorizationList?: undefined;
        blobs?: readonly `0x${string}`[] | readonly ByteArray[];
        blobVersionedHashes?: readonly `0x${string}`[];
        maxFeePerBlobGas?: bigint;
        maxFeePerGas?: bigint;
        maxPriorityFeePerGas?: bigint;
        sidecars?: false | readonly BlobSidecar<`0x${string}`>[];
        } | {
        accessList?: AccessList;
        authorizationList?: undefined;
        blobs?: readonly `0x${string}`[] | readonly ByteArray[];
        blobVersionedHashes?: readonly `0x${string}`[];
        maxFeePerBlobGas?: bigint;
        maxFeePerGas?: bigint;
        maxPriorityFeePerGas?: bigint;
        sidecars?: false | readonly BlobSidecar<`0x${string}`>[];
        }) & (ExactPartial<FeeValuesEIP4844> & OneOf<    {
        blobs: TransactionSerializableEIP4844["blobs"];
        } | {
        blobVersionedHashes: TransactionSerializableEIP4844["blobVersionedHashes"];
        } | {
        sidecars: TransactionSerializableEIP4844["sidecars"];
        }, TransactionSerializableEIP4844>) ? "eip4844" : never) | (request extends ({
        accessList?: AccessList;
        authorizationList?: SignedAuthorizationList;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: undefined;
        maxFeePerBlobGas?: undefined;
        maxFeePerGas?: bigint;
        maxPriorityFeePerGas?: bigint;
        sidecars?: undefined;
        } | {
        accessList?: AccessList;
        authorizationList?: SignedAuthorizationList;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: undefined;
        maxFeePerBlobGas?: undefined;
        maxFeePerGas?: bigint;
        maxPriorityFeePerGas?: bigint;
        sidecars?: undefined;
        }) & {
        authorizationList: TransactionSerializableEIP7702["authorizationList"];
        } ? "eip7702" : never) | (request["type"] extends string ? Extract<request["type"], string> : never)> ? T_4 extends "legacy" ? TransactionSerializedLegacy : never : never : never)>>;
        signTypedData: <const typedData extends {
            [key: string]: unknown;
        } | {
            [x: string]: readonly TypedDataParameter[];
            [x: `string[${string}]`]: never;
            [x: `function[${string}]`]: never;
            [x: `address[${string}]`]: never;
            [x: `bool[${string}]`]: never;
            [x: `bytes[${string}]`]: never;
            [x: `bytes1[${string}]`]: never;
            [x: `bytes3[${string}]`]: never;
            [x: `bytes5[${string}]`]: never;
            [x: `bytes2[${string}]`]: never;
            [x: `bytes4[${string}]`]: never;
            [x: `bytes6[${string}]`]: never;
            [x: `bytes7[${string}]`]: never;
            [x: `bytes8[${string}]`]: never;
            [x: `bytes9[${string}]`]: never;
            [x: `bytes10[${string}]`]: never;
            [x: `bytes11[${string}]`]: never;
            [x: `bytes12[${string}]`]: never;
            [x: `bytes13[${string}]`]: never;
            [x: `bytes14[${string}]`]: never;
            [x: `bytes15[${string}]`]: never;
            [x: `bytes16[${string}]`]: never;
            [x: `bytes17[${string}]`]: never;
            [x: `bytes18[${string}]`]: never;
            [x: `bytes19[${string}]`]: never;
            [x: `bytes20[${string}]`]: never;
            [x: `bytes21[${string}]`]: never;
            [x: `bytes22[${string}]`]: never;
            [x: `bytes23[${string}]`]: never;
            [x: `bytes24[${string}]`]: never;
            [x: `bytes25[${string}]`]: never;
            [x: `bytes26[${string}]`]: never;
            [x: `bytes27[${string}]`]: never;
            [x: `bytes28[${string}]`]: never;
            [x: `bytes29[${string}]`]: never;
            [x: `bytes30[${string}]`]: never;
            [x: `bytes31[${string}]`]: never;
            [x: `bytes32[${string}]`]: never;
            [x: `int[${string}]`]: never;
            [x: `int8[${string}]`]: never;
            [x: `int16[${string}]`]: never;
            [x: `int24[${string}]`]: never;
            [x: `int32[${string}]`]: never;
            [x: `int40[${string}]`]: never;
            [x: `int48[${string}]`]: never;
            [x: `int56[${string}]`]: never;
            [x: `int64[${string}]`]: never;
            [x: `int72[${string}]`]: never;
            [x: `int80[${string}]`]: never;
            [x: `int88[${string}]`]: never;
            [x: `int96[${string}]`]: never;
            [x: `int104[${string}]`]: never;
            [x: `int112[${string}]`]: never;
            [x: `int120[${string}]`]: never;
            [x: `int128[${string}]`]: never;
            [x: `int136[${string}]`]: never;
            [x: `int144[${string}]`]: never;
            [x: `int152[${string}]`]: never;
            [x: `int160[${string}]`]: never;
            [x: `int168[${string}]`]: never;
            [x: `int176[${string}]`]: never;
            [x: `int184[${string}]`]: never;
            [x: `int192[${string}]`]: never;
            [x: `int200[${string}]`]: never;
            [x: `int208[${string}]`]: never;
            [x: `int216[${string}]`]: never;
            [x: `int224[${string}]`]: never;
            [x: `int232[${string}]`]: never;
            [x: `int240[${string}]`]: never;
            [x: `int248[${string}]`]: never;
            [x: `int256[${string}]`]: never;
            [x: `uint[${string}]`]: never;
            [x: `uint8[${string}]`]: never;
            [x: `uint16[${string}]`]: never;
            [x: `uint24[${string}]`]: never;
            [x: `uint32[${string}]`]: never;
            [x: `uint40[${string}]`]: never;
            [x: `uint48[${string}]`]: never;
            [x: `uint56[${string}]`]: never;
            [x: `uint64[${string}]`]: never;
            [x: `uint72[${string}]`]: never;
            [x: `uint80[${string}]`]: never;
            [x: `uint88[${string}]`]: never;
            [x: `uint96[${string}]`]: never;
            [x: `uint104[${string}]`]: never;
            [x: `uint112[${string}]`]: never;
            [x: `uint120[${string}]`]: never;
            [x: `uint128[${string}]`]: never;
            [x: `uint136[${string}]`]: never;
            [x: `uint144[${string}]`]: never;
            [x: `uint152[${string}]`]: never;
            [x: `uint160[${string}]`]: never;
            [x: `uint168[${string}]`]: never;
            [x: `uint176[${string}]`]: never;
            [x: `uint184[${string}]`]: never;
            [x: `uint192[${string}]`]: never;
            [x: `uint200[${string}]`]: never;
            [x: `uint208[${string}]`]: never;
            [x: `uint216[${string}]`]: never;
            [x: `uint224[${string}]`]: never;
            [x: `uint232[${string}]`]: never;
            [x: `uint240[${string}]`]: never;
            [x: `uint248[${string}]`]: never;
            [x: `uint256[${string}]`]: never;
            string?: never;
            address?: never;
            bool?: never;
            bytes?: never;
            bytes1?: never;
            bytes3?: never;
            bytes5?: never;
            bytes2?: never;
            bytes4?: never;
            bytes6?: never;
            bytes7?: never;
            bytes8?: never;
            bytes9?: never;
            bytes10?: never;
            bytes11?: never;
            bytes12?: never;
            bytes13?: never;
            bytes14?: never;
            bytes15?: never;
            bytes16?: never;
            bytes17?: never;
            bytes18?: never;
            bytes19?: never;
            bytes20?: never;
            bytes21?: never;
            bytes22?: never;
            bytes23?: never;
            bytes24?: never;
            bytes25?: never;
            bytes26?: never;
            bytes27?: never;
            bytes28?: never;
            bytes29?: never;
            bytes30?: never;
            bytes31?: never;
            bytes32?: never;
            int8?: never;
            int16?: never;
            int24?: never;
            int32?: never;
            int40?: never;
            int48?: never;
            int56?: never;
            int64?: never;
            int72?: never;
            int80?: never;
            int88?: never;
            int96?: never;
            int104?: never;
            int112?: never;
            int120?: never;
            int128?: never;
            int136?: never;
            int144?: never;
            int152?: never;
            int160?: never;
            int168?: never;
            int176?: never;
            int184?: never;
            int192?: never;
            int200?: never;
            int208?: never;
            int216?: never;
            int224?: never;
            int232?: never;
            int240?: never;
            int248?: never;
            int256?: never;
            uint8?: never;
            uint16?: never;
            uint24?: never;
            uint32?: never;
            uint40?: never;
            uint48?: never;
            uint56?: never;
            uint64?: never;
            uint72?: never;
            uint80?: never;
            uint88?: never;
            uint96?: never;
            uint104?: never;
            uint112?: never;
            uint120?: never;
            uint128?: never;
            uint136?: never;
            uint144?: never;
            uint152?: never;
            uint160?: never;
            uint168?: never;
            uint176?: never;
            uint184?: never;
            uint192?: never;
            uint200?: never;
            uint208?: never;
            uint216?: never;
            uint224?: never;
            uint232?: never;
            uint240?: never;
            uint248?: never;
            uint256?: never;
        }, primaryType extends string>(args: SignTypedDataParameters<typedData, primaryType, any>) => Promise<SignTypedDataReturnType>;
        switchChain: (args: SwitchChainParameters) => Promise<void>;
        waitForCallsStatus: (parameters: WaitForCallsStatusParameters) => Promise<WaitForCallsStatusReturnType>;
        watchAsset: (args: WatchAssetParameters) => Promise<WatchAssetReturnType>;
        writeContract: <const abi extends Abi | readonly unknown[], functionName extends ContractFunctionName<abi, "payable" | "nonpayable">, args_1 extends ContractFunctionArgs<abi, "payable" | "nonpayable", functionName>, chainOverride extends Chain | undefined = undefined>(args: WriteContractParameters<abi, functionName, args_1, any, any, chainOverride>) => Promise<WriteContractReturnType>;
        writeContractSync: <const abi extends Abi | readonly unknown[], functionName extends ContractFunctionName<abi, "payable" | "nonpayable">, args_1 extends ContractFunctionArgs<abi, "payable" | "nonpayable", functionName>, chainOverride extends Chain | undefined = undefined>(args: WriteContractSyncParameters<abi, functionName, args_1, any, any, chainOverride>) => Promise<WriteContractSyncReturnType>;
        extend: <const client extends {
            [x: string]: unknown;
            account?: undefined;
            batch?: undefined;
            cacheTime?: undefined;
            ccipRead?: undefined;
            chain?: undefined;
            experimental_blockTag?: undefined;
            key?: undefined;
            name?: undefined;
            pollingInterval?: undefined;
            request?: undefined;
            transport?: undefined;
            type?: undefined;
            uid?: undefined;
        } & ExactPartial<Pick<PublicActions<CustomTransport, any, any>, "getChainId" | "prepareTransactionRequest" | "sendRawTransaction" | "call" | "createContractEventFilter" | "createEventFilter" | "estimateContractGas" | "estimateGas" | "getBlock" | "getBlockNumber" | "getContractEvents" | "getEnsText" | "getFilterChanges" | "getGasPrice" | "getLogs" | "getTransaction" | "getTransactionCount" | "getTransactionReceipt" | "readContract" | "simulateContract" | "uninstallFilter" | "watchBlockNumber" | "watchContractEvent"> & Pick<WalletActions<any, any>, "sendTransaction" | "writeContract">>>(fn: (client: Client<CustomTransport, any, any, [{
        Method: "eth_accounts";
        Parameters?: undefined;
        ReturnType: Address[];
        }, {
        Method: "eth_chainId";
        Parameters?: undefined;
        ReturnType: Quantity;
        }, {
        Method: "eth_estimateGas";
        Parameters: [transaction: RpcTransactionRequest] | [transaction: RpcTransactionRequest, block: RpcBlockNumber | BlockTag] | [transaction: RpcTransactionRequest, block: RpcBlockNumber | BlockTag, stateOverride: RpcStateOverride];
        ReturnType: Quantity;
        }, {
        Method: "eth_requestAccounts";
        Parameters?: undefined;
        ReturnType: Address[];
        }, {
        Method: "eth_sendTransaction";
        Parameters: [transaction: RpcTransactionRequest];
        ReturnType: Hash;
        }, {
        Method: "eth_sendRawTransaction";
        Parameters: [signedTransaction: Hex];
        ReturnType: Hash;
        }, {
        Method: "eth_sendRawTransactionSync";
        Parameters: [signedTransaction: Hex] | [signedTransaction: Hex, timeout: Hex];
        ReturnType: RpcTransactionReceipt;
        }, {
        Method: "eth_sign";
        Parameters: [address: Address, data: Hex];
        ReturnType: Hex;
        }, {
        Method: "eth_signTransaction";
        Parameters: [request: RpcTransactionRequest];
        ReturnType: Hex;
        }, {
        Method: "eth_signTypedData_v4";
        Parameters: [address: Address, message: string];
        ReturnType: Hex;
        }, {
        Method: "eth_syncing";
        Parameters?: undefined;
        ReturnType: NetworkSync | false;
        }, {
        Method: "personal_sign";
        Parameters: [data: Hex, address: Address];
        ReturnType: Hex;
        }, {
        Method: "wallet_addEthereumChain";
        Parameters: [chain: AddEthereumChainParameter];
        ReturnType: null;
        }, {
        Method: "wallet_addSubAccount";
        Parameters: [{
        account: OneOf<    {
        keys: readonly {
        publicKey: Hex;
        type: "address" | "p256" | "webcrypto-p256" | "webauthn-p256";
        }[];
        type: "create";
        } | {
        address: Address;
        chainId?: number | undefined;
        type: "deployed";
        } | {
        address: Address;
        chainId?: number | undefined;
        factory: Address;
        factoryData: Hex;
        type: "undeployed";
        }>;
        version: string;
        }];
        ReturnType: {
        address: Address;
        factory?: Address | undefined;
        factoryData?: Hex | undefined;
        };
        }, {
        Method: "wallet_connect";
        Parameters: [{
        capabilities?: Capabilities | undefined;
        version: string;
        }];
        ReturnType: {
        accounts: readonly {
        address: Address;
        capabilities?: Capabilities | undefined;
        }[];
        };
        }, {
        Method: "wallet_disconnect";
        Parameters?: undefined;
        ReturnType: void;
        }, {
        Method: "wallet_getAssets";
        Parameters?: [WalletGetAssetsParameters];
        ReturnType: WalletGetAssetsReturnType;
        }, {
        Method: "wallet_getCallsStatus";
        Parameters?: [string];
        ReturnType: WalletGetCallsStatusReturnType;
        }, {
        Method: "wallet_getCapabilities";
        Parameters?: readonly [] | readonly [Address | undefined] | readonly [Address | undefined, readonly Hex[] | undefined] | undefined;
        ReturnType: {
        [x: `0x${string}`]: {
        [key: string]: any;
        };
        };
        }, {
        Method: "wallet_getPermissions";
        Parameters?: undefined;
        ReturnType: WalletPermission[];
        }, {
        Method: "wallet_grantPermissions";
        Parameters?: [WalletGrantPermissionsParameters];
        ReturnType: Prettify<WalletGrantPermissionsReturnType>;
        }, {
        Method: "wallet_requestPermissions";
        Parameters: [permissions: {
        eth_accounts: Record<string, any>;
        }];
        ReturnType: WalletPermission[];
        }, {
        Method: "wallet_revokePermissions";
        Parameters: [permissions: {
        eth_accounts: Record<string, any>;
        }];
        ReturnType: null;
        }, {
        Method: "wallet_sendCalls";
        Parameters?: WalletSendCallsParameters;
        ReturnType: WalletSendCallsReturnType;
        }, {
        Method: "wallet_sendTransaction";
        Parameters: [transaction: RpcTransactionRequest];
        ReturnType: Hash;
        }, {
        Method: "wallet_showCallsStatus";
        Parameters?: [string];
        ReturnType: void;
        }, {
        Method: "wallet_switchEthereumChain";
        Parameters: [chain: {
        chainId: string;
        }];
        ReturnType: null;
        }, {
        Method: "wallet_watchAsset";
        Parameters: WatchAssetParams;
        ReturnType: boolean;
        }, ...any[]], WalletActions<any, any>>) => client) => Client<CustomTransport, any, any, [{
        Method: "eth_accounts";
        Parameters?: undefined;
        ReturnType: Address[];
        }, {
        Method: "eth_chainId";
        Parameters?: undefined;
        ReturnType: Quantity;
        }, {
        Method: "eth_estimateGas";
        Parameters: [transaction: RpcTransactionRequest] | [transaction: RpcTransactionRequest, block: RpcBlockNumber | BlockTag] | [transaction: RpcTransactionRequest, block: RpcBlockNumber | BlockTag, stateOverride: RpcStateOverride];
        ReturnType: Quantity;
        }, {
        Method: "eth_requestAccounts";
        Parameters?: undefined;
        ReturnType: Address[];
        }, {
        Method: "eth_sendTransaction";
        Parameters: [transaction: RpcTransactionRequest];
        ReturnType: Hash;
        }, {
        Method: "eth_sendRawTransaction";
        Parameters: [signedTransaction: Hex];
        ReturnType: Hash;
        }, {
        Method: "eth_sendRawTransactionSync";
        Parameters: [signedTransaction: Hex] | [signedTransaction: Hex, timeout: Hex];
        ReturnType: RpcTransactionReceipt;
        }, {
        Method: "eth_sign";
        Parameters: [address: Address, data: Hex];
        ReturnType: Hex;
        }, {
        Method: "eth_signTransaction";
        Parameters: [request: RpcTransactionRequest];
        ReturnType: Hex;
        }, {
        Method: "eth_signTypedData_v4";
        Parameters: [address: Address, message: string];
        ReturnType: Hex;
        }, {
        Method: "eth_syncing";
        Parameters?: undefined;
        ReturnType: NetworkSync | false;
        }, {
        Method: "personal_sign";
        Parameters: [data: Hex, address: Address];
        ReturnType: Hex;
        }, {
        Method: "wallet_addEthereumChain";
        Parameters: [chain: AddEthereumChainParameter];
        ReturnType: null;
        }, {
        Method: "wallet_addSubAccount";
        Parameters: [{
        account: OneOf<    {
        keys: readonly {
        publicKey: Hex;
        type: "address" | "p256" | "webcrypto-p256" | "webauthn-p256";
        }[];
        type: "create";
        } | {
        address: Address;
        chainId?: number | undefined;
        type: "deployed";
        } | {
        address: Address;
        chainId?: number | undefined;
        factory: Address;
        factoryData: Hex;
        type: "undeployed";
        }>;
        version: string;
        }];
        ReturnType: {
        address: Address;
        factory?: Address | undefined;
        factoryData?: Hex | undefined;
        };
        }, {
        Method: "wallet_connect";
        Parameters: [{
        capabilities?: Capabilities | undefined;
        version: string;
        }];
        ReturnType: {
        accounts: readonly {
        address: Address;
        capabilities?: Capabilities | undefined;
        }[];
        };
        }, {
        Method: "wallet_disconnect";
        Parameters?: undefined;
        ReturnType: void;
        }, {
        Method: "wallet_getAssets";
        Parameters?: [WalletGetAssetsParameters];
        ReturnType: WalletGetAssetsReturnType;
        }, {
        Method: "wallet_getCallsStatus";
        Parameters?: [string];
        ReturnType: WalletGetCallsStatusReturnType;
        }, {
        Method: "wallet_getCapabilities";
        Parameters?: readonly [] | readonly [Address | undefined] | readonly [Address | undefined, readonly Hex[] | undefined] | undefined;
        ReturnType: {
        [x: `0x${string}`]: {
        [key: string]: any;
        };
        };
        }, {
        Method: "wallet_getPermissions";
        Parameters?: undefined;
        ReturnType: WalletPermission[];
        }, {
        Method: "wallet_grantPermissions";
        Parameters?: [WalletGrantPermissionsParameters];
        ReturnType: Prettify<WalletGrantPermissionsReturnType>;
        }, {
        Method: "wallet_requestPermissions";
        Parameters: [permissions: {
        eth_accounts: Record<string, any>;
        }];
        ReturnType: WalletPermission[];
        }, {
        Method: "wallet_revokePermissions";
        Parameters: [permissions: {
        eth_accounts: Record<string, any>;
        }];
        ReturnType: null;
        }, {
        Method: "wallet_sendCalls";
        Parameters?: WalletSendCallsParameters;
        ReturnType: WalletSendCallsReturnType;
        }, {
        Method: "wallet_sendTransaction";
        Parameters: [transaction: RpcTransactionRequest];
        ReturnType: Hash;
        }, {
        Method: "wallet_showCallsStatus";
        Parameters?: [string];
        ReturnType: void;
        }, {
        Method: "wallet_switchEthereumChain";
        Parameters: [chain: {
        chainId: string;
        }];
        ReturnType: null;
        }, {
        Method: "wallet_watchAsset";
        Parameters: WatchAssetParams;
        ReturnType: boolean;
        }, ...any[]], { [K in keyof client]: client[K]; } & WalletActions<any, any>>;
    };
    validateConfig(): void;
    initializeNetworkConfig(): void;
    networks: {
        base: {
            chain: {
                blockExplorers: {
                    readonly default: {
                        readonly name: "Basescan";
                        readonly url: "https://basescan.org";
                        readonly apiUrl: "https://api.basescan.org/api";
                    };
                };
                blockTime: 2000;
                contracts: {
                    readonly disputeGameFactory: {
                        readonly 1: {
                            readonly address: "0x43edB88C4B80fDD2AdFF2412A7BebF9dF42cB40e";
                        };
                    };
                    readonly l2OutputOracle: {
                        readonly 1: {
                            readonly address: "0x56315b90c40730925ec5485cf004d835058518A0";
                        };
                    };
                    readonly multicall3: {
                        readonly address: "0xca11bde05977b3631167028862be2a173976ca11";
                        readonly blockCreated: 5022;
                    };
                    readonly portal: {
                        readonly 1: {
                            readonly address: "0x49048044D57e1C92A77f79988d21Fa8fAF74E97e";
                            readonly blockCreated: 17482143;
                        };
                    };
                    readonly l1StandardBridge: {
                        readonly 1: {
                            readonly address: "0x3154Cf16ccdb4C6d922629664174b904d80F2C35";
                            readonly blockCreated: 17482143;
                        };
                    };
                    readonly gasPriceOracle: {
                        readonly address: "0x420000000000000000000000000000000000000F";
                    };
                    readonly l1Block: {
                        readonly address: "0x4200000000000000000000000000000000000015";
                    };
                    readonly l2CrossDomainMessenger: {
                        readonly address: "0x4200000000000000000000000000000000000007";
                    };
                    readonly l2Erc721Bridge: {
                        readonly address: "0x4200000000000000000000000000000000000014";
                    };
                    readonly l2StandardBridge: {
                        readonly address: "0x4200000000000000000000000000000000000010";
                    };
                    readonly l2ToL1MessagePasser: {
                        readonly address: "0x4200000000000000000000000000000000000016";
                    };
                };
                ensTlds?: readonly string[] | undefined;
                id: 8453;
                name: "Base";
                nativeCurrency: {
                    readonly name: "Ether";
                    readonly symbol: "ETH";
                    readonly decimals: 18;
                };
                experimental_preconfirmationTime?: number | undefined | undefined;
                rpcUrls: {
                    readonly default: {
                        readonly http: readonly ["https://mainnet.base.org"];
                    };
                };
                sourceId: 1;
                testnet?: boolean | undefined | undefined;
                custom?: Record<string, unknown> | undefined;
                fees?: ChainFees<undefined> | undefined;
                formatters: {
                    readonly block: {
                        exclude: [] | undefined;
                        format: (args: OpStackRpcBlock, action?: string | undefined) => {
                            baseFeePerGas: bigint | null;
                            blobGasUsed: bigint;
                            difficulty: bigint;
                            excessBlobGas: bigint;
                            extraData: Hex;
                            gasLimit: bigint;
                            gasUsed: bigint;
                            hash: `0x${string}` | null;
                            logsBloom: `0x${string}` | null;
                            miner: Address;
                            mixHash: Hash;
                            nonce: `0x${string}` | null;
                            number: bigint | null;
                            parentBeaconBlockRoot?: `0x${string}` | undefined;
                            parentHash: Hash;
                            receiptsRoot: Hex;
                            sealFields: Hex[];
                            sha3Uncles: Hash;
                            size: bigint;
                            stateRoot: Hash;
                            timestamp: bigint;
                            totalDifficulty: bigint | null;
                            transactions: `0x${string}`[] | OpStackTransaction<boolean>[];
                            transactionsRoot: Hash;
                            uncles: Hash[];
                            withdrawals?: Withdrawal[] | undefined | undefined;
                            withdrawalsRoot?: `0x${string}` | undefined;
                        } & {};
                        type: "block";
                    };
                    readonly transaction: {
                        exclude: [] | undefined;
                        format: (args: OpStackRpcTransaction, action?: string | undefined) => ({
                            blockHash: `0x${string}` | null;
                            blockNumber: bigint | null;
                            from: Address;
                            gas: bigint;
                            hash: Hash;
                            input: Hex;
                            nonce: number;
                            r: Hex;
                            s: Hex;
                            to: Address | null;
                            transactionIndex: number | null;
                            typeHex: Hex | null;
                            v: bigint;
                            value: bigint;
                            yParity: number;
                            gasPrice?: undefined | undefined;
                            maxFeePerBlobGas?: undefined | undefined;
                            maxFeePerGas: bigint;
                            maxPriorityFeePerGas: bigint;
                            isSystemTx?: boolean;
                            mint?: bigint | undefined | undefined;
                            sourceHash: Hex;
                            type: "deposit";
                        } | {
                            r: Hex;
                            s: Hex;
                            v: bigint;
                            value: bigint;
                            gas: bigint;
                            to: Address | null;
                            from: Address;
                            nonce: number;
                            blockHash: `0x${string}` | null;
                            blockNumber: bigint | null;
                            transactionIndex: number | null;
                            hash: Hash;
                            input: Hex;
                            typeHex: Hex | null;
                            accessList?: undefined | undefined;
                            authorizationList?: undefined | undefined;
                            blobVersionedHashes?: undefined | undefined;
                            chainId?: number | undefined;
                            yParity?: undefined | undefined;
                            type: "legacy";
                            gasPrice: bigint;
                            maxFeePerBlobGas?: undefined | undefined;
                            maxFeePerGas?: undefined | undefined;
                            maxPriorityFeePerGas?: undefined | undefined;
                            isSystemTx?: undefined | undefined;
                            mint?: undefined | undefined;
                            sourceHash?: undefined | undefined;
                        } | {
                            blockHash: `0x${string}` | null;
                            blockNumber: bigint | null;
                            from: Address;
                            gas: bigint;
                            hash: Hash;
                            input: Hex;
                            nonce: number;
                            r: Hex;
                            s: Hex;
                            to: Address | null;
                            transactionIndex: number | null;
                            typeHex: Hex | null;
                            v: bigint;
                            value: bigint;
                            yParity: number;
                            accessList: AccessList;
                            authorizationList?: undefined | undefined;
                            blobVersionedHashes?: undefined | undefined;
                            chainId: number;
                            type: "eip2930";
                            gasPrice: bigint;
                            maxFeePerBlobGas?: undefined | undefined;
                            maxFeePerGas?: undefined | undefined;
                            maxPriorityFeePerGas?: undefined | undefined;
                            isSystemTx?: undefined | undefined;
                            mint?: undefined | undefined;
                            sourceHash?: undefined | undefined;
                        } | {
                            blockHash: `0x${string}` | null;
                            blockNumber: bigint | null;
                            from: Address;
                            gas: bigint;
                            hash: Hash;
                            input: Hex;
                            nonce: number;
                            r: Hex;
                            s: Hex;
                            to: Address | null;
                            transactionIndex: number | null;
                            typeHex: Hex | null;
                            v: bigint;
                            value: bigint;
                            yParity: number;
                            accessList: AccessList;
                            authorizationList?: undefined | undefined;
                            blobVersionedHashes?: undefined | undefined;
                            chainId: number;
                            type: "eip1559";
                            gasPrice?: undefined | undefined;
                            maxFeePerBlobGas?: undefined | undefined;
                            maxFeePerGas: bigint;
                            maxPriorityFeePerGas: bigint;
                            isSystemTx?: undefined | undefined;
                            mint?: undefined | undefined;
                            sourceHash?: undefined | undefined;
                        } | {
                            blockHash: `0x${string}` | null;
                            blockNumber: bigint | null;
                            from: Address;
                            gas: bigint;
                            hash: Hash;
                            input: Hex;
                            nonce: number;
                            r: Hex;
                            s: Hex;
                            to: Address | null;
                            transactionIndex: number | null;
                            typeHex: Hex | null;
                            v: bigint;
                            value: bigint;
                            yParity: number;
                            accessList: AccessList;
                            authorizationList?: undefined | undefined;
                            blobVersionedHashes: readonly Hex[];
                            chainId: number;
                            type: "eip4844";
                            gasPrice?: undefined | undefined;
                            maxFeePerBlobGas: bigint;
                            maxFeePerGas: bigint;
                            maxPriorityFeePerGas: bigint;
                            isSystemTx?: undefined | undefined;
                            mint?: undefined | undefined;
                            sourceHash?: undefined | undefined;
                        } | {
                            blockHash: `0x${string}` | null;
                            blockNumber: bigint | null;
                            from: Address;
                            gas: bigint;
                            hash: Hash;
                            input: Hex;
                            nonce: number;
                            r: Hex;
                            s: Hex;
                            to: Address | null;
                            transactionIndex: number | null;
                            typeHex: Hex | null;
                            v: bigint;
                            value: bigint;
                            yParity: number;
                            accessList: AccessList;
                            authorizationList: SignedAuthorizationList;
                            blobVersionedHashes?: undefined | undefined;
                            chainId: number;
                            type: "eip7702";
                            gasPrice?: undefined | undefined;
                            maxFeePerBlobGas?: undefined | undefined;
                            maxFeePerGas: bigint;
                            maxPriorityFeePerGas: bigint;
                            isSystemTx?: undefined | undefined;
                            mint?: undefined | undefined;
                            sourceHash?: undefined | undefined;
                        }) & {};
                        type: "transaction";
                    };
                    readonly transactionReceipt: {
                        exclude: [] | undefined;
                        format: (args: OpStackRpcTransactionReceipt, action?: string | undefined) => {
                            blobGasPrice?: bigint | undefined;
                            blobGasUsed?: bigint | undefined;
                            blockHash: Hash;
                            blockNumber: bigint;
                            contractAddress: Address | null | undefined;
                            cumulativeGasUsed: bigint;
                            effectiveGasPrice: bigint;
                            from: Address;
                            gasUsed: bigint;
                            logs: Log<bigint, number, false>[];
                            logsBloom: Hex;
                            root?: `0x${string}` | undefined;
                            status: "success" | "reverted";
                            to: Address | null;
                            transactionHash: Hash;
                            transactionIndex: number;
                            type: TransactionType;
                            l1GasPrice: bigint | null;
                            l1GasUsed: bigint | null;
                            l1Fee: bigint | null;
                            l1FeeScalar: number | null;
                        } & {};
                        type: "transactionReceipt";
                    };
                };
                serializers: {
                    readonly transaction: serializeTransactionOpStack;
                };
            };
            id: number;
            name: string;
        };
    };
    targetNetwork: any;
    isWalletAvailable(): boolean;
    getEthereumProvider(): any;
    connectWallet(): Promise<any>;
    switchNetwork(): Promise<void>;
    processPayment(): Promise<void>;
    openModal(): void;
    closeModal(): void;
    resetForm(): void;
    handlePresetAmount(amount: any): void;
    handleCustomAmountInput(value: any): void;
    handleMessageInput(value: any): void;
    updateCharCounter(): void;
    handleSupport(): Promise<void>;
    /**
     * Render the widget in the specified container
     * @param {string} [containerId='body'] - Container element ID or 'body'
     * @returns {void}
     */
    render(containerId?: string): void;
    getWidgetHTML(): string;
    attachEventListeners(): void;
    formatAddress(address: any): string;
    setLoading(loading: any): void;
    showError(message: any): void;
    showSuccess(): void;
    /**
     * Destroy the widget and clean up
     * @returns {void}
     */
    destroy(): void;
}
export default CryptoMeACoffee;

export declare type CryptoMeACoffeeConfig = {
    /**
     * - Recipient wallet address (required)
     */
    walletAddress: string;
    /**
     * - Backend API endpoint URL (required)
     */
    apiEndpoint: string;
    /**
     * - Display name for the creator
     */
    creatorName?: string;
    /**
     * - Thank you message after donation
     */
    message?: string;
    /**
     * - Primary color for the widget
     */
    color?: string;
    /**
     * - Widget position on screen
     */
    position?: "Left" | "Right";
    /**
     * - Horizontal margin in pixels
     */
    xMargin?: string | number;
    /**
     * - Vertical margin in pixels
     */
    yMargin?: string | number;
    /**
     * - Preset donation amounts in USD
     */
    presetAmounts?: number[];
    /**
     * - Widget theme
     */
    theme?: "light" | "dark";
    /**
     * - Blockchain network
     */
    network?: "base-sepolia" | "base";
    /**
     * - Custom logo URL
     */
    logoUrl?: string;
    /**
     * - Minimum donation amount in USD
     */
    minAmount?: number;
    /**
     * - Maximum donation amount in USD
     */
    maxAmount?: number;
};

export { }
