using FirebaseAdmin.Messaging;
using LeftoverFood.API.Data;

namespace LeftoverFood.API.Services
{
    public class FirebaseNotificationService
    {
        private readonly AppDbContext _context;

        public FirebaseNotificationService(AppDbContext context)
        {
            _context = context;
        }

        public async Task SendNightDealNotification(
            string title,
            string body)
        {
            var tokens = _context.FcmTokens
                .Select(x => x.Token)
                .ToList();

            foreach (var token in tokens)
            {
                try
                {
                    var message = new Message()
                    {
                        Token = token,

                        Notification = new Notification()
                        {
                            Title = title,
                            Body = body
                        }
                    };

                    await FirebaseMessaging
                        .DefaultInstance
                        .SendAsync(message);
                }
                catch
                {
                    continue;
                }
            }
        }
    }
}