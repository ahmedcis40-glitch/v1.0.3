package com.example.data.network

import com.squareup.moshi.Moshi
import com.squareup.moshi.kotlin.reflect.KotlinJsonAdapterFactory
import retrofit2.Retrofit
import retrofit2.converter.moshi.MoshiConverterFactory
import retrofit2.http.*

data class LoginRequest(val email: String, val password: String)
data class LoginResponse(val success: Boolean, val token: String, val user: UserNetworkData, val message: String?)

data class UserNetworkData(
    val id: String,
    val name: String,
    val email: String,
    val role: String,
    val type: String?,
    val kyc: String?,
    val balance: Double?,
    val joinedAt: String?,
    val avatar: String?
)

data class TransactionRequest(
    val ticker: String,
    val type: String,
    val quantity: Int,
    val price: Double,
    val paymentRef: String?,
    val paymentMethod: String?
)

data class TransactionNetworkData(
    val id: String,
    val userId: String,
    val userName: String,
    val ticker: String,
    val company: String,
    val type: String,
    val quantity: Int,
    val price: Double,
    val total: Double,
    val fees: Double,
    val tva: Double,
    val grandTotal: Double,
    val status: String,
    val paymentRef: String?,
    val paymentMethod: String?,
    val rejectionReason: String?,
    val submittedAt: String
)

data class TransactionsResponse(val success: Boolean, val count: Int, val data: List<TransactionNetworkData>)

interface BourseService {
    @POST("auth/login")
    suspend fun login(@Body request: LoginRequest): LoginResponse

    @GET("transactions")
    suspend fun getTransactions(@Header("Authorization") token: String): TransactionsResponse

    @POST("transactions")
    suspend fun submitTransaction(
        @Header("Authorization") token: String,
        @Body request: TransactionRequest
    ): retrofit2.Response<Unit>
}

object ApiClient {
    private const val BASE_URL = "http://10.0.2.2:3001/api/"

    private val moshi = Moshi.Builder()
        .addLast(KotlinJsonAdapterFactory())
        .build()

    val service: BourseService by lazy {
        Retrofit.Builder()
            .baseUrl(BASE_URL)
            .addConverterFactory(MoshiConverterFactory.create(moshi))
            .build()
            .create(BourseService::class.java)
    }
}
