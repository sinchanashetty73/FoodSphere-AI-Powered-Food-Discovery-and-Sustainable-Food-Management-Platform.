using Microsoft.EntityFrameworkCore;
using LeftoverFood.API.Data;
using FirebaseAdmin;
using Google.Apis.Auth.OAuth2;
using LeftoverFood.API.Services;

var builder = WebApplication.CreateBuilder(args);

// CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReact",
        policy =>
        {
            policy
            .WithOrigins(
                "http://localhost:3000",
                "https://foodsphere-ai-powered-food-discovery-and-sustainable-food-management-platform.onrender.com"
            )
            .AllowAnyHeader()
            .AllowAnyMethod();
        });
});

// Add services
builder.Services.AddControllers();


// PostgreSQL connection
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));

// Swagger (for testing)
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();



// builder.Services.AddCors(options =>
// {
//     options.AddPolicy("AllowReact",
//         policy =>
//         {
//             policy.AllowAnyOrigin()
//                   .AllowAnyMethod()
//                   .AllowAnyHeader();
//         });
// });


builder.Services.AddScoped<FirebaseNotificationService>();
var app = builder.Build();


var firebaseJson =
    Environment.GetEnvironmentVariable(
        "GOOGLE_APPLICATION_CREDENTIALS_JSON"
    );

if (!string.IsNullOrEmpty(firebaseJson))
{
    FirebaseApp.Create(new AppOptions()
    {
        Credential = GoogleCredential.FromJson(firebaseJson)
    });
}

// Middleware
app.UseSwagger();
app.UseSwaggerUI();


app.UseHttpsRedirection();

app.UseStaticFiles();
// app.UseCors("AllowAll");

app.UseCors("AllowReact");

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();



app.Run();