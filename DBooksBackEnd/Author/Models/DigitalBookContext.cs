﻿using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

#nullable disable

namespace Author.Models
{
    public partial class DigitalBookContext : DbContext
    {
        public DigitalBookContext()
        {
        }

        public DigitalBookContext(DbContextOptions<DigitalBookContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Book> Books { get; set; }
        public virtual DbSet<BookPurchase> BookPurchases { get; set; }
        public virtual DbSet<DigitalBookAuth> DigitalBookAuths { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
                optionsBuilder.UseSqlServer("Server=tcp:digital-book.database.windows.net,1433;Initial Catalog=DigitalBook;Persist Security Info=False;User ID=DB;Password=Book@1234;MultipleActiveResultSets=False;Encrypt=True;TrustServerCertificate=False;Connection Timeout=30;");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.HasAnnotation("Relational:Collation", "SQL_Latin1_General_CP1_CI_AS");

            modelBuilder.Entity<Book>(entity =>
            {
                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.AuthorId).HasMaxLength(50);

                entity.Property(e => e.AuthorName).HasMaxLength(50);

                entity.Property(e => e.Category).HasMaxLength(50);

                entity.Property(e => e.IsActive).HasColumnName("isActive");

                entity.Property(e => e.Price).HasMaxLength(50);

                entity.Property(e => e.Publisher).HasMaxLength(50);

                entity.Property(e => e.ReleasedDate).HasMaxLength(50);

                entity.Property(e => e.Title).HasMaxLength(50);
            });

            modelBuilder.Entity<BookPurchase>(entity =>
            {
                entity.ToTable("BookPurchase");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.Bookid).HasMaxLength(50);

                entity.Property(e => e.InvoiceNo).HasMaxLength(50);

                entity.Property(e => e.IsRefunded)
                    .HasColumnName("isRefunded")
                    .HasDefaultValueSql("((0))");

                entity.Property(e => e.PaymentId)
                    .HasMaxLength(50)
                    .HasColumnName("PaymentID");

                entity.Property(e => e.PurchaseTime)
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("(getdate())");

                entity.Property(e => e.Userid).HasMaxLength(50);
            });

            modelBuilder.Entity<DigitalBookAuth>(entity =>
            {
                entity.ToTable("DigitalBookAuth");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.Password).HasColumnName("password");

                entity.Property(e => e.PaymentId).HasColumnName("paymentID");

                entity.Property(e => e.UserName)
                    .IsRequired()
                    .HasMaxLength(50)
                    .HasColumnName("userName");

                entity.Property(e => e.UserType)
                    .HasMaxLength(50)
                    .HasColumnName("userType");
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
