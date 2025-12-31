---
name: systems-computing
description: Understand computer systems from digital logic through operating systems, networks, databases, and distributed systems.
---

# Systems & Architecture

## Quick Start

Master how modern computers actually work, from circuits to distributed systems.

### Digital Logic & CPU

**Boolean Logic**
- Gates: AND, OR, NOT, XOR
- Truth tables
- Karnaugh maps
- Logic simplification

**CPU Concepts**
- Instruction execution cycle
- Registers and cache hierarchy
- Pipelining
- Branch prediction

**Cache Memory**
- L1, L2, L3 hierarchy
- Temporal and spatial locality
- Cache lines and blocks
- Replacement policies: LRU, FIFO

### Operating Systems

**Process Management**
- Process states and context switching
- Scheduling algorithms: FCFS, SJF, round-robin
- Scheduling metrics: throughput, turnaround time

**Memory Management**
- Virtual memory and paging
- Page tables and TLB
- Page replacement: LRU, optimal
- Heap and stack management

**File Systems**
- File organization
- Directory structures
- Allocation methods: contiguous, linked, indexed
- Free space management

**Concurrency**
- Race conditions and critical sections
- Mutual exclusion: locks, semaphores
- Deadlock: conditions, detection, recovery
- Reader-writer problems

### Networking

**OSI Model**
- Layer 1: Physical (signals, cables)
- Layer 2: Data Link (MAC, switching)
- Layer 3: Network (IP, routing)
- Layer 4: Transport (TCP, UDP)
- Layers 5-7: Session, presentation, application

**Protocols**
- HTTP/HTTPS: Web
- TCP: Reliable connection
- UDP: Fast connectionless
- DNS: Name resolution
- ARP: Address resolution

**IP Addressing**
- IPv4: 32-bit addresses
- CIDR notation: w.x.y.z/prefix
- Subnetting
- NAT and private networks

### Databases

**ACID Properties**
- Atomicity: All or nothing
- Consistency: Valid state
- Isolation: No interference
- Durability: Persistence

**Indexing**
- B-Tree: ordered, range queries
- Hash: exact match
- Index selection and tuning

**Query Optimization**
- Query plans
- Join algorithms: nested loop, hash, merge
- Cost estimation

### Distributed Systems

**Fundamentals**
- Scalability: handling growth
- Availability: fault tolerance
- Consistency: data agreement

**CAP Theorem**
- Consistency: all nodes same data
- Availability: responds to requests
- Partition tolerance: survives splits
- Can guarantee only 2 of 3

**Consensus Algorithms**
- Paxos: proven consensus
- Raft: simpler consensus
- Byzantine fault tolerance

**Scaling Techniques**
- Horizontal scaling
- Load balancing
- Data sharding
- Replication strategies

## Key Concepts

- **Latency**: Time to complete one task
- **Throughput**: Tasks completed per unit time
- **Scalability**: Performance with increasing load
- **Fault tolerance**: Reliability despite failures
- **Trade-offs**: Speed vs safety, consistency vs availability

## Learning Path

**Week 1-2: Digital Logic**
- Boolean algebra
- Logic gates
- Simple circuits

**Week 3-4: CPU Architecture**
- Instruction set
- Cache hierarchy
- Pipelining

**Week 5-6: Operating Systems**
- Processes and scheduling
- Memory management
- Concurrency control

**Week 7-8: Networks**
- OSI model
- TCP/IP protocols
- IP addressing

**Week 9-10: Databases**
- ACID properties
- Indexing
- Query optimization

**Week 11-12: Distributed Systems**
- CAP theorem
- Consensus
- Scaling techniques

## Interview Questions

- How do caches work?
- Explain virtual memory
- What is thrashing?
- Difference between TCP and UDP?
- How do transactions work?
- Explain sharding
- Design a system that scales to millions of users
- How would you handle a network partition?

## Resources

- Computer Architecture (Hennessy & Patterson)
- Operating Systems: Three Easy Pieces
- Computer Networking: A Top-Down Approach
- Designing Data-Intensive Applications
- MIT 6.033: Systems Engineering