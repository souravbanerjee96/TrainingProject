using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

#nullable disable

namespace CustomerServices.Models
{
    public partial class CustomerServiceRequestsContext : DbContext
    {
        public CustomerServiceRequestsContext()
        {
        }

        public CustomerServiceRequestsContext(DbContextOptions<CustomerServiceRequestsContext> options)
            : base(options)
        {
        }

        public virtual DbSet<ServiceRequest> ServiceRequests { get; set; }
        public virtual DbSet<ServiceResolution> ServiceResolutions { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
                optionsBuilder.UseSqlServer("Data Source=CTSDOTNET858;Initial Catalog=CustomerServiceRequests;User ID=sa;Password=pass@word1");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.HasAnnotation("Relational:Collation", "SQL_Latin1_General_CP1_CI_AS");

            modelBuilder.Entity<ServiceRequest>(entity =>
            {
                entity.Property(e => e.AddedDate)
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("(getdate())");

                entity.Property(e => e.IsDeleted)
                    .HasColumnName("isDeleted")
                    .HasDefaultValueSql("((0))");

                entity.Property(e => e.RequiredDate).HasMaxLength(50);

                entity.Property(e => e.ServiceType).HasMaxLength(50);

                entity.Property(e => e.UserId).HasColumnName("userID");
            });

            modelBuilder.Entity<ServiceResolution>(entity =>
            {
                entity.ToTable("ServiceResolution");

                entity.Property(e => e.AdminId).HasColumnName("AdminID");

                entity.Property(e => e.IsUserAccepted)
                    .HasDefaultValueSql("((0))")
                    .HasComment("0 - Not Accepted\r\n1 - Accepted");

                entity.Property(e => e.RequestId).HasColumnName("RequestID");

                entity.Property(e => e.ResolutionDate)
                    .HasColumnType("date")
                    .HasDefaultValueSql("(getdate())");

                entity.Property(e => e.Status).HasMaxLength(3);
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
