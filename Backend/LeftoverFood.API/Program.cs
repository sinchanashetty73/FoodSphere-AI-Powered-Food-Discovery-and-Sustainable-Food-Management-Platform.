using Microsoft.EntityFrameworkCore;
using LeftoverFood.API.Data;
using FirebaseAdmin;
using Google.Apis.Auth.OAuth2;
using LeftoverFood.API.Services;

var builder = WebApplication.CreateBuilder(args);

// Add services
builder.Services.AddControllers();


// PostgreSQL connection
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));

// Swagger (for testing)
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll",
        policy =>
        {
            policy.WithOrigins("http://localhost:3000")
                  .AllowAnyMethod()
                  .AllowAnyHeader();
        });
});

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
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReact", policy =>
    {
        policy.WithOrigins("http://localhost:3000")
              .AllowAnyMethod()
              .AllowAnyHeader();
    });
});

builder.Services.AddScoped<FirebaseNotificationService>();
var app = builder.Build();

FirebaseApp.Create(new AppOptions()
{
    Credential = GoogleCredential.FromFile(
        Path.Combine(
            Directory.GetCurrentDirectory(),
            "Firebase",
            "foodsphereai-firebase-adminsdk-fbsvc-80337fbd6d.json"
        ))
});

// Middleware
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("AllowReact");
app.UseHttpsRedirection();

app.UseStaticFiles();
// app.UseCors("AllowAll");

app.UseAuthorization();

app.MapControllers();



app.Run();