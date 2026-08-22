using Microsoft.EntityFrameworkCore;
using LeftoverFood.API.Data;
using FirebaseAdmin;
using Google.Apis.Auth.OAuth2;
using LeftoverFood.API.Services;

Environment.SetEnvironmentVariable(
    "DOTNET_USE_POLLING_FILE_WATCHER",
    "true"
);

var builder = WebApplication.CreateBuilder(new WebApplicationOptions
{
    Args = args,
    EnvironmentName = Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT")
});

// CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReact",
        policy =>
        {
            policy.WithOrigins(
                "http://localhost:3000",
                "http://localhost:5173",
                "https://frontend-dtw6.onrender.com"
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

// using (var scope = app.Services.CreateScope())
// {
//     var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();
//     db.Database.Migrate();
// }


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

app.UseRouting();


app.UseCors("AllowReact");

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.MapGet("/", () => "FoodSphere API is running!");

app.Run();